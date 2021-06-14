import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as moment from 'moment';
export enum ArticleStatus {
  draft = '0',
  pendingReview = '1',
  checkPassed = '2',
  auditFailure = '3',
  deleted = '4',
}

@Entity('article', { schema: 'headline_admin' })
export class Article {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title', length: 500 })
  title: string;

  @Column('text', { name: 'content' })
  content: string;

  @Column({
    type: 'enum',
    enum: ArticleStatus,
    name: 'status',
    default: ArticleStatus.draft,
  })
  status: number;

  @Column({
    type: 'int',
    name: 'channel_id',
    nullable: true,
  })
  channelId: number;

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
  })
  createAt: Date | null;

  @Column('timestamp', {
    name: 'updateAt',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updateAt: Date | null;

  @Column('simple-json', { name: 'cover', nullable: true })
  cover: string[] | null;
}
