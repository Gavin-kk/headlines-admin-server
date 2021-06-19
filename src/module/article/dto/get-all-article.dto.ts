import { ArticleStatus } from 'src/module/entitys/Article';
import { ApiProperty } from '@nestjs/swagger';

export class GetAllArticleDto {
  @ApiProperty({ description: '文章状态', required: false })
  status?: ArticleStatus | 'all';
  @ApiProperty({ description: '频道id', required: false })
  channelId?: string;
  @ApiProperty({ description: '开始时间', required: false })
  startTime?: string;
  @ApiProperty({ description: '结束时间', required: false })
  endTime?: string;
  @ApiProperty({ description: '页码', required: false })
  pageNum?: string;
  @ApiProperty({ description: '每页数量', required: false })
  pageSize?: string;
}
