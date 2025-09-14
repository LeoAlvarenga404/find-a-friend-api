import { Org, Prisma } from "@prisma/client";

export interface OrgsRepository {
  create(data: Prisma.OrgUncheckedCreateInput): Promise<Org>;
  findById(id_org: string): Promise<Org | null>;
}
