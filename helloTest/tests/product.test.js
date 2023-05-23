const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const productModel = require("../models/product.model");
require("dotenv").config();

let productId;

beforeAll(async () => {
  console.log("before All");
  await mongoose.connect(process.env.MONGODB_URI);

  const product = await productModel.create({
    name: "Product 1",
    price: 12000,
    description: "Product 1 Description",
  });
  productId = product._id;
  return product;
});

beforeEach(async () => {
  console.log("before Each");
});

afterEach(async () => {
  console.log("after All");
});

afterAll(async () => {
  console.log("after All");
  await productModel.findByIdAndDelete(productId);
  await mongoose.connection.close();
});

describe("GET /api/products", () => {
  it("get products api", async () => {
    const response = await request(app).get("/api/products");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("GET /api/products/:id", () => {
  it("get products api", async () => {
    const response = await request(app).get(`/api/products/${productId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.name).toBe("Product 1");
  });
});
