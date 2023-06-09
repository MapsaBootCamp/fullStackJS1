import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schemas/category.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async allCategories() {
    return await this.categoryModel
      .find()
      .populate({ path: 'parentCat', populate: { path: 'parentCat' } });
  }

  async addCategory(title: string, parentCat: string) {
    let parentCatObj;
    if (parentCat) {
      parentCatObj = await this.categoryModel.findOne({
        title: parentCat,
      });
    }
    return await this.categoryModel.create({
      title,
      parentCat: parentCat ? parentCatObj._id : null,
    });
  }
}
