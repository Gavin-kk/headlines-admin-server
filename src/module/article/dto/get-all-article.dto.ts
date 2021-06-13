import { ArticleStatus } from 'src/module/entitys/Article';
import { ApiProperty } from '@nestjs/swagger';

export class GetAllArticleDto {
  @ApiProperty({ description: '文章状态', required: false })
  status?: ArticleStatus;
  @ApiProperty({ description: '频道id', required: false })
  channelId?: number;
  @ApiProperty({ description: '开始时间', required: false })
  startTime?: number;
  @ApiProperty({ description: '结束时间', required: false })
  endTime?: number;
  @ApiProperty({ description: '页码', required: false })
  pageNum?: number;
  @ApiProperty({ description: '每页数量', required: false })
  pageSize?: number;
}
