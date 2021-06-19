import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { Comment } from "./Comment";

@Index("user_id", ["userId"], {})
@Entity("article", { schema: "headline_admin" })
export class Article {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", length: 500 })
  title: string;

  @Column("text", { name: "cover", nullable: true })
  cover: string | null;

  @Column("enum", {
    name: "status",
    enum: ["0", "1", "2", "3", "4"],
    default: () => "'0'",
  })
  status: "0" | "1" | "2" | "3" | "4";

  @Column("text", { name: "content" })
  content: string;

  @Column("timestamp", {
    name: "createAt",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createAt: Date | null;

  @Column("timestamp", {
    name: "updateAt",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updateAt: Date | null;

  @Column("bigint", {
    name: "create_time",
    nullable: true,
    default: () => "'1624086919909'",
  })
  createTime: string | null;

  @Column("int", { name: "channel_id", nullable: true })
  channelId: number | null;

  @Column("bit", {
    name: "whether_comment",
    nullable: true,
    default: () => "'b'1''",
  })
  whetherComment: boolean | null;

  @Column("int", {
    name: "total_comments",
    comment: "总评论数",
    default: () => "'0'",
  })
  totalComments: number;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @ManyToOne(() => Users, (users) => users.articles, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];
}
