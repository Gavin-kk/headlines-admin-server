import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article, ArticleStatus } from '../entitys/Article';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { GetAllArticleDto } from './dto/get-all-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async create({
    title,
    content = '空',
    cover = '',
    channel,
    status = ArticleStatus.draft,
  }: CreateArticleDto) {
    if (!content) {
      content = '<p>啊哦 是空的</p>';
    }
    return this.articleRepository.save({
      title,
      content,
      cover: [cover],
      channelId: channel,
      status: status,
    });
  }

  public async uploadCover(files: Express.Multer.File[]): Promise<string[]> {
    const covers: string[] = [];
    files.forEach((item) => {
      covers.push(
        `http://${process.env.APP_HOST}:${process.env.APP_PORT}/static/${item.filename}`,
      );
    });
    return covers;
  }

  async findAll({
    status,
    channelId,
    startTime,
    endTime,
    pageNum = 1,
    pageSize = 10,
  }: GetAllArticleDto) {
    const article: SelectQueryBuilder<Article> = this.articleRepository
      .createQueryBuilder('a')
      .select();

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
    const result: Article[] = await article.getMany();
    const list: Article[] = result
      .reverse()
      .slice((pageNum - 1) * pageSize, (pageNum - 1) * pageSize + pageSize);

    return {
      total: result.length,
      pageNum,
      pageSize,
      list: list,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return this.articleRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}
