import { PartialType } from '@nestjs/swagger';
import { UploadMaterialDto } from './upload-material.dto';

export class UpdateMaterialDto extends PartialType(UploadMaterialDto) {}
