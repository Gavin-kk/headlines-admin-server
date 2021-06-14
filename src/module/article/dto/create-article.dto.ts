import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({ description: '文章的title' })
  @IsNotEmpty({ message: '文章title不可为空' })
  title: string;

  @ApiProperty({ description: '文章内容' })
  @IsNotEmpty({ message: '文章内容不可为空' })
  content: string;

  @ApiProperty({ description: '文章的封面' })
  cover: string[];
}
