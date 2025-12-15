import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewslettersController } from './newsletters.controller';
import { NewslettersService } from './newsletters.service';
import { Newsletter } from './entities/newsletter.entity';
import { Property } from '../properties/entities/property.entity';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Newsletter, Property]), UploadModule],
  controllers: [NewslettersController],
  providers: [NewslettersService],
  exports: [NewslettersService],
})
export class NewslettersModule {}
