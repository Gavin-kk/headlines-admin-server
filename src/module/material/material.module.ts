import { Module } from '@nestjs/common';
import { MaterialService } from './material.service';
import { MaterialController } from './material.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from '../entitys/Material';
import { MulterModule } from '@nestjs/platform-express';
import { fileFilter, storage } from '../../config/upload.config';
import { MaterialLike } from '../entitys/MaterialLike';
import { Users } from '../entitys/Users';

@Module({
  imports: [
    TypeOrmModule.forFeature([Material, MaterialLike, Users]),
    MulterModule.register({
      storage,
      fileFilter,
    }),
  ],
  controllers: [MaterialController],
  providers: [MaterialService],
})
export class MaterialModule {}
