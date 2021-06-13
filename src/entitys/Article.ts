import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('article', { schema: 'headline_admin' })
export class Article {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title', length: 500 })
  title: string;

  @Column('int', { name: 'status' })
  status: number;

  @Column('timestamp', {
    name: 'createTime',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date | null;

  @Column('timestamp', {
    name: 'updateTime',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updateTime: Date | null;

  @Column('simple-json', { name: 'cover', nullable: true })
  cover: string | null;
}
