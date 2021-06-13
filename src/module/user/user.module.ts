import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entitys/Users';
import { MulterModule } from '@nestjs/platform-express';
import { fileFilter, storage } from 'src/config/upload.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    MulterModule.register({
      storage,
      fileFilter,
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
