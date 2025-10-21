import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { COLUMN_DEFAULT_LENGTH } from '../constants/constants';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: COLUMN_DEFAULT_LENGTH })
  username: string;

  @Column({ type: 'varchar', length: COLUMN_DEFAULT_LENGTH, unique: true })
  email: string;

  @Column({ type: 'varchar', length: COLUMN_DEFAULT_LENGTH })
  password: string;
}
