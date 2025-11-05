import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./prodcut.entity";

@Entity({ name: "sale" })
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, {
    nullable: false,
    eager: true,
    onDelete: "CASCADE",
  })
  product: Product;

  @Column({ type: "int", nullable: false })
  quantity: number;

  @Column({ name: "total_amount", type: "float", nullable: false })
  totalAmount: number;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;
}
