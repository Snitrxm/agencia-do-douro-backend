import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sharp from 'sharp';
import * as fs from 'fs/promises';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

export interface UploadResult {
  url: string;
  filename: string;
  format: string;
  width: number;
  height: number;
}

export interface UploadOptions {
  propertyId?: string;
}

export interface FileUploadResult {
  url: string;
  filename: string;
  originalName: string;
  mimeType: string;
  fileSize: number;
  filePath: string;
}

export interface MediaUploadResult {
  url: string;
  filename: string;
  type: 'image' | 'video';
  mimeType: string;
  width?: number;
  height?: number;
}

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);
  private readonly uploadDir: string;
  private readonly baseUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.uploadDir = this.configService.get<string>(
      'UPLOAD_DIR',
      'uploads/images',
    );
    this.baseUrl = this.configService.get<string>(
      'BASE_URL',
      'http://localhost:3008',
    );
    this.ensureUploadDirExists();
  }

  private async ensureUploadDirExists() {
    try {
      await fs.access(this.uploadDir);
    } catch {
      await fs.mkdir(this.uploadDir, { recursive: true });
      this.logger.log(`Created upload directory: ${this.uploadDir}`);
    }

    // Criar também diretório para arquivos gerais
    const filesDir = this.configService.get<string>(
      'UPLOAD_FILES_DIR',
      'uploads/files',
    );
    try {
      await fs.access(filesDir);
    } catch {
      await fs.mkdir(filesDir, { recursive: true });
      this.logger.log(`Created files directory: ${filesDir}`);
    }
  }

  /**
   * Gera um nome único para o arquivo
   * Se propertyId for fornecido: {propertyId}-{timestamp}-{random}.ext
   * Caso contrário: {uuid}.ext
   */
  private generateFilename(
    extension: string,
    propertyId?: string,
  ): string {
    if (propertyId) {
      const timestamp = Date.now();
      const randomChars = Math.random().toString(36).substring(2, 8);
      return `${propertyId}-${timestamp}-${randomChars}${extension}`;
    }
    return `${uuidv4()}${extension}`;
  }

  async uploadImage(
    file: Express.Multer.File,
    options?: UploadOptions,
  ): Promise<UploadResult> {
    const filename = this.generateFilename('.webp', options?.propertyId);
    const filepath = path.join(this.uploadDir, filename);

    try {
      // Process image with sharp: resize to max 1920x1080 and convert to WebP
      const processed = await sharp(file.buffer)
        .resize(1920, 1080, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: 85 })
        .toBuffer();

      // Save to disk
      await fs.writeFile(filepath, processed);

      // Get image metadata
      const metadata = await sharp(processed).metadata();

      const url = `${this.baseUrl}/uploads/images/${filename}`;

      this.logger.log(`Image uploaded successfully: ${filename}`);

      return {
        url,
        filename,
        format: metadata.format || 'webp',
        width: metadata.width || 0,
        height: metadata.height || 0,
      };
    } catch (error) {
      this.logger.error(
        `Failed to upload image: ${error.message}`,
        error.stack,
      );
      throw new Error('Falha ao fazer upload da imagem');
    }
  }

  async uploadMultipleImages(
    files: Express.Multer.File[],
    options?: UploadOptions,
  ): Promise<string[]> {
    const uploadPromises = files.map((file) => this.uploadImage(file, options));
    const results = await Promise.all(uploadPromises);
    return results.map((result) => result.url);
  }

  async deleteImage(filename: string): Promise<void> {
    const filepath = path.join(this.uploadDir, filename);

    try {
      await fs.unlink(filepath);
      this.logger.log(`Image deleted successfully: ${filename}`);
    } catch (error) {
      this.logger.error(
        `Failed to delete image: ${error.message}`,
        error.stack,
      );
      throw new Error('Falha ao deletar imagem');
    }
  }

  // ==========================================
  // Métodos para upload de arquivos genéricos
  // ==========================================

  async uploadFile(
    file: Express.Multer.File,
    options?: UploadOptions,
  ): Promise<FileUploadResult> {
    const fileExt = path.extname(file.originalname);
    const filename = this.generateFilename(fileExt, options?.propertyId);
    const uploadDir = this.configService.get<string>(
      'UPLOAD_FILES_DIR',
      'uploads/files',
    );
    const filepath = path.join(uploadDir, filename);

    try {
      // Garantir que o diretório existe
      await fs
        .access(uploadDir)
        .catch(() => fs.mkdir(uploadDir, { recursive: true }));

      // Salvar arquivo no disco (sem processamento)
      await fs.writeFile(filepath, file.buffer);

      const url = `${this.baseUrl}/uploads/files/${filename}`;

      this.logger.log(`Arquivo enviado com sucesso: ${filename}`);

      return {
        url,
        filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        fileSize: file.size,
        filePath: url,
      };
    } catch (error) {
      this.logger.error(
        `Falha ao fazer upload do arquivo: ${error.message}`,
        error.stack,
      );
      throw new Error('Falha ao fazer upload do arquivo');
    }
  }

  async uploadMultipleFiles(
    files: Express.Multer.File[],
    options?: UploadOptions,
  ): Promise<FileUploadResult[]> {
    return Promise.all(files.map((f) => this.uploadFile(f, options)));
  }

  async deleteFile(
    filename: string,
    directory: string = 'uploads/files',
  ): Promise<void> {
    const filepath = path.join(directory, filename);

    try {
      await fs.unlink(filepath);
      this.logger.log(`Arquivo deletado: ${filename}`);
    } catch (error) {
      this.logger.error(
        `Falha ao deletar arquivo: ${error.message}`,
        error.stack,
      );
      throw new Error('Falha ao deletar arquivo');
    }
  }

  // ==========================================
  // Métodos para upload de mídia (imagens e vídeos)
  // ==========================================

  /**
   * Upload de arquivo de mídia (imagem ou vídeo)
   * - Imagens: processadas com Sharp (resize + webp)
   * - Vídeos: salvos diretamente sem processamento
   */
  async uploadMedia(
    file: Express.Multer.File,
    options?: UploadOptions,
  ): Promise<MediaUploadResult> {
    const isImage = file.mimetype.startsWith('image/');
    const isVideo = file.mimetype.startsWith('video/');

    if (isImage) {
      // Processar imagem com Sharp
      const result = await this.uploadImage(file, options);
      return {
        url: result.url,
        filename: result.filename,
        type: 'image',
        mimeType: `image/${result.format}`,
        width: result.width,
        height: result.height,
      };
    } else if (isVideo) {
      // Salvar vídeo diretamente sem processamento
      const fileExt = path.extname(file.originalname) || '.mp4';
      const filename = this.generateFilename(fileExt, options?.propertyId);
      const filepath = path.join(this.uploadDir, filename);

      try {
        await fs.writeFile(filepath, file.buffer);
        const url = `${this.baseUrl}/uploads/images/${filename}`;

        this.logger.log(`Vídeo enviado com sucesso: ${filename}`);

        return {
          url,
          filename,
          type: 'video',
          mimeType: file.mimetype,
        };
      } catch (error) {
        this.logger.error(
          `Falha ao fazer upload do vídeo: ${error.message}`,
          error.stack,
        );
        throw new Error('Falha ao fazer upload do vídeo');
      }
    } else {
      throw new Error('Tipo de arquivo não suportado');
    }
  }

  /**
   * Upload de múltiplos arquivos de mídia
   */
  async uploadMultipleMedia(
    files: Express.Multer.File[],
    options?: UploadOptions,
  ): Promise<string[]> {
    const uploadPromises = files.map((file) => this.uploadMedia(file, options));
    const results = await Promise.all(uploadPromises);
    return results.map((result) => result.url);
  }
}
