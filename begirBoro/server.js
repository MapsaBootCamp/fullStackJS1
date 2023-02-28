const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient();

///ModelViewController ====> MVC

app.get("/category", async (req, res) => {
  try {
    const cagtegories = await prisma.category.findMany();
    res.json(cagtegories);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
});

app.get(`/category/:id`, async (req, res) => {
  const { id } = req.params;
  console.log(req.query);
  
  const category = await prisma.category.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(category);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server run on por ${PORT}`);
});
