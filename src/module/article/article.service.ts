import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article, ArticleStatus } from '../entitys/Article';
import { Repository } from 'typeorm';
import { GetAllArticleDto } from './dto/get-all-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async create({ title, content, cover }: CreateArticleDto) {
    return this.articleRepository.save({
      title,
      content,
      cover: JSON.stringify(cover),
    });
  }

  /*{
  status,
  channelId,
  startTime,
  endTime,
  pageNum,
  pageSize,
}*/
  async findAll({
    status = ArticleStatus.draft,
    channelId = 0,
    startTime = 0,
    endTime = 9999999999999999,
    pageNum = 1,
    pageSize = 10,
  }: GetAllArticleDto) {
    return this.articleRepository
      .createQueryBuilder('a')
      .select()
      .where('a.status = :status', { status })
      .andWhere('a.channel_id = :channelId', { channelId })
      .andWhere('a.create_time > :startTime', { startTime })
      .andWhere('a.create_time < :endTime', { endTime })
      .offset((pageNum - 1) * pageSize)
      .limit(pageSize)
      .getMany();
    // console.log(exist);
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
