import { Prisma, Org } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { randomUUID } from "node:crypto";

export class InMemoryOrgsRepository implements OrgsRepository {
  private items: Org[] = [];

  async findById(id_org: string) {
    const org = this.items.find((org) => org.id_org === id_org);

    if (!org) return null;

    return org;
  }
  async create(data: Prisma.OrgUncheckedCreateInput) {
    const org = {
      id_org: randomUUID(),
      name: data.name,
      id_user: data.id_user,
      address: data.address,
      zip_code: data.zip_code,
      whatsapp: data.whatsapp,
    };

    this.items.push(org);

    return org;
  }
}
