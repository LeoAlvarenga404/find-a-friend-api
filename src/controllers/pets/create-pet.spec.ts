import request from "supertest";
import { app } from "@/app";

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

describe("Create Pet (e2e)", async () => {
  beforeEach(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it("should be able to create a pet", async () => {
    const user = await prisma.user.create({
      data: {
        email: "leonardo.alvarenga@gmail.com",
        name: "Leonardo Prado",
        password_hash: await hash("123456", 6),
        role: "ORG",
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
      .post("/pets")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Pet 1",
        id_org: org.id_org,
        about: "lorem ipsum dolor sit amet.",
        address: org.address,
        age: "CUB",
        energy_level: "LOW",
        adopted: false,
        photo_url: null,
      });
    expect(response.statusCode).toEqual(201);
  });
});
