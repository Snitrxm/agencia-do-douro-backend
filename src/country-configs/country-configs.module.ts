import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryConfig } from './entities/country-config.entity';
import { CountryConfigsService } from './country-configs.service';
import { CountryConfigsController } from './country-configs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CountryConfig])],
  controllers: [CountryConfigsController],
  providers: [CountryConfigsService],
  exports: [CountryConfigsService],
})
export class CountryConfigsModule {}
