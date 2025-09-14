import request from "supertest";
import { app } from "@/app";

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

describe("Login (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to login", async () => {
    await request(app.server).post("/register").send({
      name: "Leonardo Prado",
      email: "leonardo@gmail.com",
      password: "123456",
    });

    const response = await request(app.server).post("/login").send({
      email: "leonardo@gmail.com",
      password: "123456",
    });

    expect(response.body).toEqual({
      accessToken: expect.any(String),
    });
  });
});
