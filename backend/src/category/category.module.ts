import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryEntity } from '../entity/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity]),
    ConfigModule.forRoot({}),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
