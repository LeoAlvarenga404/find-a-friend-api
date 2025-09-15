import request from "supertest";
import { app } from "@/app";

import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

describe("Create Org (e2e)", async () => {
  beforeEach(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it("should be able to create a Org", async () => {
    const user = await prisma.user.create({
      data: {
        email: "leonardo.alvarenga@gmail.com",
        name: "Leonardo Prado",
        password_hash: await hash("123456", 6),
        role: "MEMBER",
      },
    });
    const response = await request(app.server).post("/orgs").send({
      id_user: user.id_user,
      address: "Rua Teste",
      zip_code: "13204-021",
      whatsapp: "11950265539",
    });

    expect(response.statusCode).toEqual(201);

    const getUser = await prisma.user.findUniqueOrThrow({
      where: {
        id_user: user.id_user,
      },
    });

    expect(getUser.role).toEqual("ORG");
  });
});
