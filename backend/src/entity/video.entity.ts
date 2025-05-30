import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity()
export class VideoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true, default: null })
  thumbnail: string;

  @Column({ nullable: true, default: null })
  video_url: string;

  @Column('simple-array')
  tags: string[];

  @ManyToMany(() => CategoryEntity, (category) => category.videos, {
    cascade: true,
  })
  @JoinTable()
  categories: CategoryEntity[];

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
