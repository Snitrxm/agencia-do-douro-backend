import {
  Controller,
  Get,
  Patch,
  Body,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { SiteConfigService } from './site-config.service';
import { UpdateSiteConfigDto } from './dto/update-site-config.dto';
import { UploadService } from '../upload/upload.service';

@Controller('site-config')
export class SiteConfigController {
  constructor(
    private readonly siteConfigService: SiteConfigService,
    private readonly uploadService: UploadService,
  ) {}

  @Get()
  getConfig() {
    return this.siteConfigService.getConfig();
  }

  @Patch()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'apresentadoraImage', maxCount: 1 },
        { name: 'podcastImagem', maxCount: 1 },
      ],
      {
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (_req, file, cb) => {
          const isImage = file.mimetype.match(
            /^image\/(jpg|jpeg|png|gif|webp)$/,
          );
          if (!isImage) {
            return cb(
              new BadRequestException('Apenas imagens são permitidas'),
              false,
            );
          }
          cb(null, true);
        },
      },
    ),
  )
  async updateConfig(
    @Body() updateSiteConfigDto: UpdateSiteConfigDto,
    @UploadedFiles()
    files: {
      apresentadoraImage?: Express.Multer.File[];
      podcastImagem?: Express.Multer.File[];
    },
  ) {
    if (files?.apresentadoraImage && files.apresentadoraImage.length > 0) {
      const imageUrl = await this.uploadService.uploadImage(
        files.apresentadoraImage[0],
      );
      updateSiteConfigDto.apresentadoraImage = imageUrl.url;
    }

    if (files?.podcastImagem && files.podcastImagem.length > 0) {
      const imageUrl = await this.uploadService.uploadImage(
        files.podcastImagem[0],
      );
      updateSiteConfigDto.podcastImagem = imageUrl.url;
    }

    return this.siteConfigService.updateConfig(updateSiteConfigDto);
  }
}
