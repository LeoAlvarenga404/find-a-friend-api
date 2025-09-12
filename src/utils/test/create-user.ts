import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";

export async function createUser(app: FastifyInstance, isOrg = false) {
  const user = await prisma.user.create({
    data: {
      name: "Leonardo Prado",
      email: "leonardo@gmail.com",
      password_hash: await hash("123456", 6),
      role: isOrg ? "ORG" : "MEMBER",
    },
  });

  return {
    user,
  };
}
