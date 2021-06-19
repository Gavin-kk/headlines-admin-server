import { HttpException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../entitys/Comment';
import { Repository } from 'typeorm';
import { Article } from '../entitys/Article';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  public async create(createCommentDto: CreateCommentDto, userId: number) {
    const { content, articleId, parentId } = createCommentDto;
    const result = await this.articleRepository.findOne({ id: articleId });
    console.log(result.whetherComment);
    if (!result.whetherComment) {
      throw new HttpException({ code: 400, message: '评论已关闭' }, 400);
    }
    return this.commentRepository.save({
      content,
      articleId,
      parentId: parentId || null,
      userId: userId,
    });
  }

  public async findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
