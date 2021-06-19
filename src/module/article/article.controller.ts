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
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetAllArticleDto } from './dto/get-all-article.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadCoverDto } from './dto/upload-cover.dto';
import { CurrentUser } from '../../common/decorator/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('文章模块')
@Controller('article')
@UseGuards(AuthGuard('jwt'))
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiOperation({ summary: '发布文章' })
  @Post()
  public async create(
    @Body() createArticleDto: CreateArticleDto,
    @CurrentUser('id') id: number,
  ) {
    return this.articleService.create(createArticleDto, id);
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
  findAll(
    @Query() getAllArticleDto: GetAllArticleDto,
    @CurrentUser('id') id: number,
  ) {
    return this.articleService.findAll(getAllArticleDto, id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }

  @ApiOperation({
    summary: '关闭评论或开启评论',
    description:
      '如果评论为关闭状态 请求此接口就是开启评论 如果评论为开启状态 请求此接口就是关闭评论',
  })
  @Patch(':id')
  commentSwitch(@Param('id') id: string) {
    return this.articleService.commentSwitch(+id);
  }
}
