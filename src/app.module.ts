import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log4jsModule } from '@nestx-log4js/core';
import { databaseConfig } from './config/database.config';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { ArticleModule } from './module/article/article.module';
import { ChannelsModule } from './module/channels/channels.module';
import { MaterialModule } from './module/material/material.module';
import { CommentModule } from './module/comment/comment.module';
import { GeographicModule } from './module/geographic/geographic.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(databaseConfig),
    Log4jsModule.forRoot(),
    AuthModule,
    UserModule,
    ArticleModule,
    ChannelsModule,
    MaterialModule,
    CommentModule,
    GeographicModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
