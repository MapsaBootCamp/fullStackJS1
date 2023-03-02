const express = require("express");
const { userRouter } = require("./routes");

const app = express();
app.use(express.json());

function log(req, res, next) {
  console.log("ye darkhst umad!");
  next();
}

// app.use(log);

app.use("/user", userRouter);

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

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`server run on por ${PORT}`);
});
