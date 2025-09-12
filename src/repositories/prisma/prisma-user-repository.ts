import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { prisma } from "@/lib/prisma";

export class PrismaUsersRepository implements UsersRepository {
  async changeRoleToOrg(id_user: string): Promise<void> {
    await prisma.user.update({
      where: {
        id_user,
      },
      data: {
        role: "ORG",
      },
    });
  }
  async findById(id_user: string) {
    const user = await prisma.user.findFirst({
      where: {
        id_user,
      },
    });

    return user;
  }
  async findByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
