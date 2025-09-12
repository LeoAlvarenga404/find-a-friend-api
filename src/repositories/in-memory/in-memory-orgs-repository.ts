import { Prisma, Org } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { randomUUID } from "node:crypto";

export class InMemoryOrgsRepository implements OrgsRepository {
  private items: Org[] = [];
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
