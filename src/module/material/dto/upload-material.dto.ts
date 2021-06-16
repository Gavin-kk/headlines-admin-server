import { ApiProperty } from '@nestjs/swagger';

export class UploadMaterialDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: string;
}
