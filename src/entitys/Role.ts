import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("role", { schema: "headline_admin" })
export class Role {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "role_name", length: 30 })
  roleName: string;

  @Column("varchar", { name: "auth_name", length: 30 })
  authName: string;

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

  @Column("text", { name: "menu", nullable: true })
  menu: string | null;

  @Column("text", { name: "auth_time" })
  authTime: string;

  @Column("text", { name: "parent_menu", nullable: true })
  parentMenu: string | null;
}
