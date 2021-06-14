import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto {
  @ApiProperty({ description: '创建频道的名称' })
  @IsNotEmpty({ message: '频道名称不可为空' })
  name: string;
}
