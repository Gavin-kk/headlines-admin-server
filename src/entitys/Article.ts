import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    default: () => "'1623833441190'",
  })
  createTime: string | null;

  @Column("int", { name: "channel_id", nullable: true })
  channelId: number | null;
}
