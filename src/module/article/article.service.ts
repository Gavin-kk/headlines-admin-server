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

  async findAll({
    status,
    channelId,
    startTime,
    endTime,
    pageNum = 1,
    pageSize = 10,
  }: GetAllArticleDto) {
    const article = this.articleRepository.createQueryBuilder('a').select();

    if (status && status !== 'all') {
      article.where('a.status = :status', { status });
    }
    if (channelId) {
      article.andWhere('a.channel_id = :channelId', { channelId });
    }
    if (startTime) {
      article.andWhere('a.create_time > :startTime', { startTime });
    }
    if (endTime) {
      article.andWhere('a.create_time < :endTime', { endTime });
    }
    const total = await article.getMany();

    const list: Article[] = await article
      .offset((pageNum - 1) * pageSize)
      .limit(pageSize)
      .getMany();

    return {
      total: total.length,
      pageNum,
      pageSize,
      list,
    };
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
