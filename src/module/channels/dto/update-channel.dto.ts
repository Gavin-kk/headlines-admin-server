import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateChannelDto } from './create-channel.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateChannelDto extends PartialType(CreateChannelDto) {
  @ApiProperty({ description: '频道id' })
  @IsNotEmpty({ message: '频道id不可为空' })
  id: number;

  @ApiProperty({ description: '频道名称' })
  @IsNotEmpty({ message: '文章名称不可为空' })
  name: string;
}
