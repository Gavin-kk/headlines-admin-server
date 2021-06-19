import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './Users';
import { Article } from './Article';
import * as moment from 'moment';

@Index('article_id', ['articleId'], {})
@Index('parent_id', ['parentId'], {})
@Index('user_id', ['userId'], {})
@Entity('comment', { schema: 'headline_admin' })
export class Comment {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('text', { name: 'content' })
  content: string;

  @Column('int', { name: 'likes', nullable: true, default: () => "'0'" })
  likes: number | null;

  @Column('int', { name: 'parent_id', nullable: true })
  parentId: number | null;

  @Column('int', { name: 'user_id', nullable: true })
  userId: number | null;

  @Column('int', { name: 'article_id', nullable: true })
  articleId: number | null;

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

  @ManyToOne(() => Users, (users) => users.comments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @ManyToOne(() => Article, (article) => article.comments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'article_id', referencedColumnName: 'id' }])
  article: Article;

  @ManyToOne(() => Comment, (comment) => comment.comments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'parent_id', referencedColumnName: 'id' }])
  parent: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent)
  comments: Comment[];
}
