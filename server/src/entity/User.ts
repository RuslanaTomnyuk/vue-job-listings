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

  // @Column({ select: false })
  @Column()
    password: string;

  @Column()
    confirmPassword: string;

  @Column({ nullable: true })
    passwordChangeAt: Date;

  @Column({ nullable: true })
    passwordResetToken: string;

  @Column({ nullable: true })
    passwordResetTokenExpires: Date;
  
  @ManyToMany(() => Role, { cascade: true })
  @JoinTable()
    roles: Role[];
}
