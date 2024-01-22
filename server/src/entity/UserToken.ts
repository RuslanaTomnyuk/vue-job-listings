import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserToken {
  @PrimaryGeneratedColumn()
    userId: number;

  @Column()
    token: string;
}
