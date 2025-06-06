import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryEntity } from '../entity/category.entity';
import { CategoryDto } from '../dto/category.dto';
import { CategoryResponse } from '../interfaces/category-response.interfaces ';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private category_repository: Repository<CategoryEntity>,
  ) {}

  async getAllCategories() {
    const data = await this.category_repository.find();

    return data;
  }

  async getCategoryById(id: number): Promise<CategoryResponse | null> {
    const data = await this.category_repository.findOne({
      where: {
        id,
      },
    });

    if (!data) {
      return {
        category: null,
        message: 'Không tìm thấy ID',
        status_code: 400,
        success: false,
      };
    }

    return {
      category: data,
      message: 'Tìm thấy',
      status_code: 200,
      success: true,
    };
  }

  async createCategory(categoryDto: CategoryDto): Promise<CategoryResponse> {
    const data = this.category_repository.create(categoryDto);

    await this.category_repository.save(data);

    return {
      message: 'Tạo thành công',
      status_code: 201,
      success: true,
      category: data,
    };
  }

  async updateCategory(
    id: number,
    categoryDto: CategoryDto,
  ): Promise<CategoryResponse> {
    const existingData = await this.category_repository.findOneBy({
      id,
    });

    if (!existingData) {
      return {
        category: null,
        message: 'Không tìm thấy ID',
        status_code: 400,
        success: false,
      };
    }

    existingData.title = categoryDto.title;
    existingData.is_active = categoryDto.is_active;

    await this.category_repository.save(existingData);

    return {
      success: true,
      message: 'Cập nhật thành công',
      status_code: 200,
      category: existingData,
    };
  }

  async deActiveCategories(body: {
    ids: number[];
    active: boolean;
  }): Promise<CategoryResponse | null> {
    const { ids, active } = body;

    if (ids.length === 0) {
      return {
        message: 'Không tìm thấy IDs',
        status_code: 400,
        success: false,
      };
    }

    const categories = await this.category_repository
      .createQueryBuilder('category')
      .select('category.id')
      .where('category.id IN (:...ids)', { ids })
      .getMany();

    if (!categories || categories.length === 0) {
      return {
        message: 'IDs không tồn tại',
        status_code: 400,
        success: false,
      };
    }

    const existingIds = Array.isArray(categories)
      ? categories.map((c) => c.id)
      : [];

    await this.category_repository
      .createQueryBuilder()
      .update(CategoryEntity)
      .set({ is_active: active })
      .where('id IN (:...ids)', { ids: existingIds })
      .execute();

    return {
      message: 'Cập nhật thành công',
      status_code: 200,
      success: true,
      category: null,
    };
  }
}
