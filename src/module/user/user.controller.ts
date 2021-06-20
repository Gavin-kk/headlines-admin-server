import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../common/decorator/current-user.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Users } from '../entitys/Users';
import { AvatarUploadDto } from './dto/avatar-upload.dto';
import { RegisterDto } from './dto/create-user.dto';

@ApiTags('用户模块')
@ApiBearerAuth()
@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiOperation({ summary: '用户注册' })
  async register(@Body() RegisterDto: RegisterDto) {
    const user = await this.userService.saveUser(RegisterDto);
    delete user.password;
    return user;
  }

  @Get('info')
  @ApiOperation({ summary: '获取用户详情' })
  async findOne(@CurrentUser('id') id: number) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: '上传用户头像' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '头像上传',
    type: AvatarUploadDto,
  })
  @Post('avatar')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('avatar'))
  async avatarUpload(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: Users,
  ) {
    console.log(file);
    return this.userService.avatarUpload(file, user);
  }

  @ApiOperation({
    summary: '编辑用户资料',
    description: '更新用户手机号或邮箱 可以为空 为空则不执行',
  })
  @Patch('profile')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user: Users,
  ) {
    return this.userService.update(updateUserDto, user);
  }
}
