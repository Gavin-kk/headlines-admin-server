import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ description: '文章id' })
  @IsNotEmpty({ message: '文章id不可为空' })
  articleId: number;

  @ApiProperty({ description: '如果你是回复评论 在此传入评论的id' })
  parentId: number;

  @ApiProperty({ description: '评论内容' })
  content: string;
}
