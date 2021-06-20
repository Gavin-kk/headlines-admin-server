import { Module } from '@nestjs/common';
import { GeographicService } from './geographic.service';
import { GeographicController } from './geographic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Geographic } from '../entitys/Geographic';

@Module({
  imports: [TypeOrmModule.forFeature([Geographic])],
  controllers: [GeographicController],
  providers: [GeographicService],
})
export class GeographicModule {}
