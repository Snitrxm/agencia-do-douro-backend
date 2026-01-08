import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DesiredZonesService } from './desired-zones.service';
import { DesiredZonesController } from './desired-zones.controller';
import { DesiredZone } from './entities/desired-zone.entity';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([DesiredZone]), UploadModule],
  controllers: [DesiredZonesController],
  providers: [DesiredZonesService],
  exports: [DesiredZonesService],
})
export class DesiredZonesModule {}
