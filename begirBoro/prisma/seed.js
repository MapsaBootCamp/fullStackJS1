const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const userData = [
  {
    email: "a@test.com",
    driveLicense: true,
    address: "Tehran",
  },
  {
    email: "b@test.com",
    driveLicense: false,
    address: "Tehran",
  },
];

const categoryData = [
  {
    title: "docharkhe",
    products: {
      create: [
        {
          pelak: "123456",
          title: "kuhestan",
        },
        {
          pelak: "123457",
          title: "mosabeghe",
        },
      ],
    },
  },
  {
    title: "machine",
    products: {
      create: [
        {
          pelak: "123-99",
          title: "pride",
        },
        {
          pelak: "321-10",
          title: "peguet",
        },
      ],
    },
  },
  {
    title: "motor",
    products: {
      create: [
        {
          pelak: "12-10",
          title: "CG125",
        },
        {
          pelak: "21-20",
          title: "click",
        },
      ],
    },
  },
];
async function main() {
  console.log(`Start seeding ...`);
  for (const cat of categoryData) {
    const catObj = await prisma.category.create({
      data: cat,
    });
    console.log(`Created user with id: ${catObj.id}`);
  }
  for (const user of userData) {
    const userObj = await prisma.user.create({
      data: user,
    });
    console.log(`Created user with id: ${userObj.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
