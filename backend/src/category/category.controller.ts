import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CategoryService } from './category.service';
import { VideoGuard } from '../video/video.guard';
import { CategoryDto } from '../dto/category.dto';

@Controller('api/v1/category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getCategoryById(@Param() params: { id: number }) {
    return this.categoryService.getCategoryById(params.id);
  }

  @HttpCode(HttpStatus.OK)
  @Post('create')
  @UseGuards(VideoGuard)
  create(@Body() body: CategoryDto) {
    return this.categoryService.createCategory(body);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('update/:id')
  @UseGuards(VideoGuard)
  update(@Param() params: { id: number }, @Body() body: CategoryDto) {
    return this.categoryService.updateCategory(params.id, body);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('deactive')
  @UseGuards(VideoGuard)
  deactiveCategories(@Body() body: { ids: number[]; active: boolean }) {
    return this.categoryService.deActiveCategories(body);
  }
}
