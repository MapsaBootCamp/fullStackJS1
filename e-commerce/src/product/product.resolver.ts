import { Args, Query, Resolver } from '@nestjs/graphql';
import { Category } from './schemas/category.schema';
import { ProductService } from './product.service';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Category])
  getAllCategories() {
    return this.productService.allCategories();
  }

  @Query(() => Category)
  getCategory(@Args('id', { type: () => String }) id: string) {
    return this.productService.findCategoryById(id);
  }
}
