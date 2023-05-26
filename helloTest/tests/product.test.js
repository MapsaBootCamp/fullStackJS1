const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const productModel = require("../models/product.model");
require("dotenv").config();

let productId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  const product = await productModel.create({
    name: "Product 1",
    price: 12000,
    description: "Product 1 Description",
  });
  productId = product._id;
  return product;
});

afterAll(async () => {
  await productModel.findByIdAndDelete(productId);
  await mongoose.connection.close();
});

describe("GET /api/products", () => {
  it("get products list api", async () => {
    const response = await request(app).get("/api/products");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("GET /api/products/:id", () => {
  let response;
  beforeEach(async () => {
    response = await request(app).get(`/api/products/${productId}`);
  });

  it("get products detail api", async () => {
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("get products detail api name check", async () => {
    expect(response.body.name).toBe("Product 1");
  });
});

describe("POST /api/products", () => {
  it("check it's ok by all required parameters", async () => {
    const response = await request(app).post(`/api/products/`).send({
      name: "Product 2",
      price: 32000,
      description: "lkegkehg",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe("Product 2");
  });
});

describe("DELETE /api/products/:id", () => {
  it("check delete product", async () => {
    const response = await request(app).delete(`/api/products/${productId}`);
    expect(response.statusCode).toBe(200);
    const newResponse = await request(app).get(
      `/api/products/${response.body._id}`
    );
    expect(newResponse.body).toBeNull();
  });
});
