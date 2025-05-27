import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../interfaces/role.enum';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: Role.Admin })
  role: Role;
}
