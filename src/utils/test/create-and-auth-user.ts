import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthUser(app: FastifyInstance, isOrg = false) {
  const user = await prisma.user.create({
    data: {
      name: "Leonardo Prado",
      email: "leonardo.alvarenga@gmail.com",
      password_hash: await hash("123456", 6),
      role: isOrg ? "ORG" : "MEMBER",
    },
  });

  if (isOrg === true) {
    await request(app.server).post("/orgs").send({
      id_user: user.id_user,
      address: "Rua da Agua",
      whatsapp: "11950655398",
      zip_code: "13227-010",
    });
  }

  const authResponse = await request(app.server).post("/login").send({
    email: "leonardo.alvarenga@gmail.com",
    password: "123456",
  });

  const { accessToken } = authResponse.body;

  return { accessToken };
}
