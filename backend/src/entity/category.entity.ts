import { PrimaryGeneratedColumn, Entity, Column, ManyToMany } from 'typeorm';
import { VideoEntity } from './video.entity';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  image_url: string;

  @Column({ unique: true })
  title: string;

  @ManyToMany(() => VideoEntity, (video) => video.categories)
  videos: VideoEntity[];

  @Column()
  is_active: boolean;
}
