import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Depoimento } from './entities/depoimento.entity';
import { DepoimentosController } from './depoimentos.controller';
import { DepoimentosService } from './depoimentos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Depoimento])],
  controllers: [DepoimentosController],
  providers: [DepoimentosService],
  exports: [],
})
export class DepoimentosModule {}
