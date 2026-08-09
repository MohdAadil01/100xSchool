import request from "supertest";
import { app } from "../../app";

describe("Auth Routes", () => {
  const superadminData = {
    firstName: "Super",
    lastName: "Admin",
    email: "superadmin@test.com",
    password: "pass1234",
    phone: "999999999",
    role: "superadmin",
  };
  describe("POST /api/v1/auth/register", () => {
    test("should register superadmin successfully", async () => {
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send(superadminData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.token).toBeDefined();
    });

    test("should not register if email already exists", async () => {
      await request(app).post("/api/v1/auth/register").send(superadminData);

      const response = await request(app)
        .post("/api/v1/auth/register")
        .send(superadminData);

      expect(response.status).toBe(409);
      expect(response.body.success).toBe(false);
    });

    test("should not register non superadmin without property", async () => {
      const response = await request(app).post("/api/v1/auth/register").send({
        firstName: "Admin",
        lastName: "First",
        email: "adminfirst@test.com",
        password: "pass1234",
        phone: "999999999",
        role: "admin",
      });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe("POST /api/v1/auth/login", () => {
    test("user is able to login", async () => {
      await request(app).post("/api/v1/auth/register").send(superadminData);
      const response = await request(app).post("/api/v1/auth/login").send({
        email: "superadmin@test.com",
        password: "pass1234",
      });

      expect(response.status).toBe(200);
      expect(response.body.data.token).toBeDefined();
    });

    test("user does not exists", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({
        email: "superadmin@test.com",
        password: "pass1234",
      });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });

    test("login with wrong password", async () => {
      await request(app).post("/api/v1/auth/register").send(superadminData);
      const response = await request(app).post("/api/v1/auth/login").send({
        email: "superadmin@test.com",
        password: "pass123432",
      });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });
});
