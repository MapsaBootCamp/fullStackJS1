import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get('all-categories')
  async getAllCategories() {
    return await this.productService.allCategories();
  }

  @Get('all-categories-object')
  async getAllCategoriesObject() {
    return await this.productService.allCategoriesObject();
  }

  @Post('add-category')
  async addCategory(@Body() createCategoryDto: CreateCategoryDto) {
    console.log(createCategoryDto.title);

    return await this.productService.addCategory(
      createCategoryDto.title,
      createCategoryDto.parentCat,
    );
  }
}
