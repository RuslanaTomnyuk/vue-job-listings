import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from './Role';
import { IsEmail } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    username: string;

  @Column()
  @IsEmail()
    email: string;

  @Column()
    password: string;

  @Column()
    confirmPassword: string;

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable()
    roles: Role[];
}
