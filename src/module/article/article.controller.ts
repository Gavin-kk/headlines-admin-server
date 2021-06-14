import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetAllArticleDto } from './dto/get-all-article.dto';
import { AvatarUploadDto } from '../user/dto/avatar-upload.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadCoverDto } from './dto/upload-cover.dto';

@ApiTags('文章模块')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiOperation({ summary: '发布文章' })
  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '上传发布文章内容文件',
    type: UploadCoverDto,
  })
  @ApiOperation({ summary: '上传发布文章内容文件' })
  @UseInterceptors(FilesInterceptor('files'))
  @Post('upload/file')
  public async uploadCover(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<string[]> {
    return this.articleService.uploadCover(files);
  }

  @ApiOperation({ summary: '获取文章列表' })
  @Get()
  findAll(@Query() getAllArticleDto: GetAllArticleDto) {
    return this.articleService.findAll(getAllArticleDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
