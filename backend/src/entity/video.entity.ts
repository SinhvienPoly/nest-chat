import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class VideoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  thumbnail: string;

  @Column({ default: true })
  is_active: boolean;
}
