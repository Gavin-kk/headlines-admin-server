import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FindAllDto {
  @ApiProperty({ description: '每页条数' })
  @IsNotEmpty({ message: '每页条数不可为空' })
  pageSize: string;
  @ApiProperty({ description: '页码' })
  @IsNotEmpty({ message: '页码不可为空' })
  pageNum: string;
}
