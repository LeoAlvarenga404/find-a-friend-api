import { Prisma, Org } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { prisma } from "@/lib/prisma";

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgUncheckedCreateInput) {
    const org = await prisma.org.create({
      data,
    });

    return org;
  }
  async findById(id_org: string) {
    const org = await prisma.org.findUnique({
      where: {
        id_org,
      },
    });

    return org;
  }
}
