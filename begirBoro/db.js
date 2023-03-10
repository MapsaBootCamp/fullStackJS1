const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function connectionCheck() {
  await prisma.$connect();
}

(function main() {
  connectionCheck()
    .then(async () => {
      console.log("connect to DB!");
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      setTimeout(() => main(), 5000);
      // process.exit(1);
    });
})();

module.exports = prisma;
