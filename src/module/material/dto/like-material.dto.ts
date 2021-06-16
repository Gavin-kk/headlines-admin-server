import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LikeMaterialDto {
  @ApiProperty({ description: '被喜欢的素材的id' })
  @IsNotEmpty({ message: 'id不可为空' })
  id: number;
}
