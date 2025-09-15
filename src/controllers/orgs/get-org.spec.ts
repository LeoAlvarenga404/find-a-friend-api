import request from "supertest";
import { app } from "@/app";

import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

describe("Get Org (e2e)", async () => {
  beforeEach(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it("should be able to get a Org by ID", async () => {
    const user = await prisma.user.create({
      data: {
        email: "leonardo.alvarenga@gmail.com",
        name: "Leonardo Prado",
        password_hash: await hash("123456", 6),
        role: "MEMBER",
      },
    });
    const org = await prisma.org.create({
      data: {
        id_user: user.id_user,
        address: "Rua Teste",
        zip_code: "13204-021",
        whatsapp: "11950265539",
        name: "Leonardo Prado",
      },
    });

    const authResponse = await request(app.server).post("/login").send({
      email: "leonardo.alvarenga@gmail.com",
      password: "123456",
    });

    const { accessToken } = authResponse.body;

    const response = await request(app.server)
      .get(`/orgs/${org.id_org}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(200);
  });
});
