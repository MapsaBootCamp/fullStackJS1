import { PrismaClient, Prisma } from "@prisma/client";
import Category from "./category.interface";

const prismaConnection: PrismaClient = new PrismaClient();

class AppService {
  constructor() {}

  async getAllCat(): Promise<Category[]> {
    try {
      console.log("appService");

      return await prismaConnection.category.findMany({
        where: {
          parentCategoryId: null,
        },
        include: {
          subCategories: {
            include: {
              subCategories: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default AppService;
