import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as moment from 'moment';
import { Comment } from './Comment';
import { Users } from './Users';
export enum ArticleStatus {
  draft = '0',
  pendingReview = '1',
  checkPassed = '2',
  auditFailure = '3',
  deleted = '4',
}
@Index('user_id', ['userId'], {})
@Entity('article', { schema: 'headline_admin' })
export class Article {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title', length: 500 })
  title: string;

  @Column('text', { name: 'content' })
  content: string;

  @Column('bit', { name: 'whether_comment', default: true })
  whetherComment: boolean;

  @Column({
    type: 'enum',
    enum: ArticleStatus,
    name: 'status',
    default: ArticleStatus.draft,
  })
  status: string;

  @Column('int', { name: 'total_comments', default: 0, comment: '总评论数' })
  totalComments: number;

  @Column({
    type: 'int',
    name: 'channel_id',
    nullable: true,
  })
  channelId: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('bigint', {
    name: 'create_time',
    nullable: true,
    default: new Date().getTime(),
  })
  createTime: number | null;

  @Column('timestamp', {
    name: 'createAt',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    transformer: {
      to(value: string): string {
        return value;
      },
      from(value: string): number {
        return moment(value).valueOf();
      },
    },
  })
  createAt: Date | null;

  @Column('timestamp', {
    name: 'updateAt',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    transformer: {
      to(value: string): string {
        return value;
      },
      from(value: string): number {
        return moment(value).valueOf();
      },
    },
  })
  updateAt: Date | null;

  @ManyToOne(() => Users, (users) => users.articles, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @Column('simple-json', { name: 'cover', nullable: true })
  cover: string[] | null;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];
}
