import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import sharp from 'sharp';
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
    this.baseUrl = this.configService.get<string>('BASE_URL', 'http://localhost:3008');
    this.ensureUploadDirExists();
  }

  private async ensureUploadDirExists() {
    try {
      await fs.access(this.uploadDir);
    } catch {
      await fs.mkdir(this.uploadDir, { recursive: true });
      this.logger.log(`Created upload directory: ${this.uploadDir}`);
    }
  }

  async uploadImage(file: Express.Multer.File): Promise<UploadResult> {
    const filename = `${uuidv4()}.webp`;
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
      this.logger.error(`Failed to upload image: ${error.message}`, error.stack);
      throw new Error('Falha ao fazer upload da imagem');
    }
  }

  async uploadMultipleImages(files: Express.Multer.File[]): Promise<string[]> {
    const uploadPromises = files.map((file) => this.uploadImage(file));
    const results = await Promise.all(uploadPromises);
    return results.map((result) => result.url);
  }

  async deleteImage(filename: string): Promise<void> {
    const filepath = path.join(this.uploadDir, filename);

    try {
      await fs.unlink(filepath);
      this.logger.log(`Image deleted successfully: ${filename}`);
    } catch (error) {
      this.logger.error(`Failed to delete image: ${error.message}`, error.stack);
      throw new Error('Falha ao deletar imagem');
    }
  }
}
