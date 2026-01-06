import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
  Body,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 200 * 1024 * 1024 }, // 200MB
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          return cb(
            new BadRequestException(
              'Apenas imagens são permitidas (jpg, jpeg, png, gif, webp)',
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('propertyId') propertyId?: string,
  ) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo foi enviado');
    }

    const result = await this.uploadService.uploadImage(file, { propertyId });
    return {
      url: result.url,
      filename: result.filename,
      format: result.format,
      width: result.width,
      height: result.height,
    };
  }

  @Post('images')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      limits: { fileSize: 200 * 1024 * 1024 }, // 200MB por arquivo
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          return cb(
            new BadRequestException(
              'Apenas imagens são permitidas (jpg, jpeg, png, gif, webp)',
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadMultipleImages(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('propertyId') propertyId?: string,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Nenhum arquivo foi enviado');
    }

    const urls = await this.uploadService.uploadMultipleImages(files, {
      propertyId,
    });
    return {
      urls,
      count: urls.length,
    };
  }
}
