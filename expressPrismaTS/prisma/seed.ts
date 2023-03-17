import { PrismaClient, Prisma } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

// Prisma.UserCreateInput[]

const cats = [
  {
    title: "کالای دیجیتال",
    subCategories: {
      create: [
        {
          title: "گوشی موبایل",
          subCategories: {
            create: [
              {
                title: "اپل",
              },
              {
                title: "سامسونگ",
              },
            ],
          },
        },
      ],
    },
  },
  { title: "مد و پوشاک" },
];

(async function main() {
  for (const cat of cats) {
    await prisma.category.create({
      data: cat,
    });
  }
})();
