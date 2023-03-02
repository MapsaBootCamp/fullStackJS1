const { PrismaClient } = require("@prisma/client");

console.log("db");

const prisma = new PrismaClient();

module.exports = prisma;
