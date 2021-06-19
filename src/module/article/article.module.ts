import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../entitys/Article';
import { MulterModule } from '@nestjs/platform-express';
import { fileFilter, storage } from 'src/config/upload.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    MulterModule.register({
      storage,
    }),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
