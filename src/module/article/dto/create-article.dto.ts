import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ArticleStatus } from 'src/module/entitys/Article';

export class CreateArticleDto {
  @ApiProperty({ description: '文章的title' })
  @IsNotEmpty({ message: '文章title不可为空' })
  title: string;

  @ApiProperty({ description: '文章内容' })
  content: string;

  @ApiProperty({ description: '文章的封面' })
  cover: string;

  @ApiProperty({ description: '所属频道' })
  channel: number;

  @ApiProperty({ description: '文章状态' })
  status: ArticleStatus;
}
