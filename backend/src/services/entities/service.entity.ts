import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "product" })
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "name",
    type: "varchar",
    length: 64,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({ name: "unit_price", type: "float", nullable: false })
  unitPrice: number;

  @Column({ name: "price_per_kg", type: "float", nullable: false })
  pricePerKG: number;
}
