import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../entitys/Comment';
import { Article } from '../entitys/Article';
import { ArticleService } from '../article/article.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Article])],
  controllers: [CommentController],
  providers: [CommentService, ArticleService],
})
export class CommentModule {}
