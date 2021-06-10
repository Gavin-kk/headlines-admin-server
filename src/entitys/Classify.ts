import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ClassifyGoods } from "./ClassifyGoods";

@Index("IDX_72d2ec276c347f652b6926b5e3", ["categoryName"], { unique: true })
@Index("parent_id", ["parentId"], {})
@Entity("classify", { schema: "headline_admin" })
export class Classify {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "parent_id", nullable: true })
  parentId: number | null;

  @Column("varchar", { name: "category_name", unique: true, length: 50 })
  categoryName: string;

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

  @OneToMany(() => ClassifyGoods, (classifyGoods) => classifyGoods.pClassify)
  classifyGoods: ClassifyGoods[];
}
