import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ArticleService } from '../article/article.service';
import { GetAllArticleDto } from '../article/dto/get-all-article.dto';
import { CurrentUser } from '../../common/decorator/current-user.decorator';
import { Users } from '../entitys/Users';
import { AuthGuard } from '@nestjs/passport';

@Controller('comment')
@UseGuards(AuthGuard('jwt'))
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly articleService: ArticleService,
  ) {}

  @ApiOperation({ summary: '发布评论' })
  @ApiBearerAuth()
  @Post()
  public async create(
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser() user: Users,
  ) {
    return this.commentService.create(createCommentDto, user.id);
  }

  @ApiOperation({ summary: '查询所有文章' })
  @Get()
  public async findAll(
    @Query() getAllArticleDto: GetAllArticleDto,
    @CurrentUser('id') id: number,
  ) {
    return this.articleService.findAll(getAllArticleDto, id);
  }
}
