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

  async allCategoriesObject() {
    const allCategories = await this.categoryModel.find();

    const titles = allCategories.map((cat) => cat.title);
    const result = allCategories
      .map((parent) => {
        const children = allCategories.filter((child) => {
          return child.id !== child.parentCat && child.parentCat === parent.id;
        });
        return children.length ? { ...parent, children } : parent;
      })
      .filter((cat) => {
        return cat.title === cat.parentCat || !titles.includes(cat.parentCat);
      });

    return result;
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
