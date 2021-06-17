import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { UploadMaterialDto } from './dto/upload-material.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from '../../common/decorator/current-user.decorator';
import { Users } from '../entitys/Users';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LikeMaterialDto } from './dto/like-material.dto';
import { AuthGuard } from '@nestjs/passport';
import { FindAllDto } from './dto/find-all.dto';

@ApiBearerAuth()
@ApiTags('素材管理模块')
@UseGuards(AuthGuard('jwt'))
@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: '上传素材接口' })
  @ApiBody({
    description: '上传素材',
    type: UploadMaterialDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload/file')
  public async create(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: Users,
  ) {
    return this.materialService.create(file, user);
  }

  @ApiOperation({ summary: '获取个人所有的素材' })
  @Get()
  async findAll(
    @CurrentUser('id') id: string,
    @Query() findAllDto: FindAllDto,
  ) {
    return this.materialService.findAll(+id, findAllDto);
  }

  @ApiOperation({ summary: '获取个人所有喜欢的素材' })
  @Get('like/all')
  async getAllLikes(
    @CurrentUser('id') id: number,
    @Query() findAllDto: FindAllDto,
  ) {
    return this.materialService.getAllLike(id, findAllDto);
  }

  @ApiOperation({
    summary: '添加个人喜欢和取消喜欢',
    description: '已经喜欢过的素材 再次请求此接口携带喜欢的id 就可以取消喜欢了',
  })
  @Post('like')
  async likeMaterial(
    @Body() likeMaterialDto: LikeMaterialDto,
    @CurrentUser('id') userid: number,
  ) {
    return this.materialService.likeMaterial(likeMaterialDto, userid);
  }

  @ApiOperation({ summary: '删除素材' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.materialService.remove(+id);
  }
}
