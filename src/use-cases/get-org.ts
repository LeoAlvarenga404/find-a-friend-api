import { UsersRepository } from "@/repositories/users-repository";
import { Org } from "@prisma/client";

import { OrgsRepository } from "@/repositories/orgs-repository";

interface GetOrgUseCaseRequest {
  id_org: string;
}

interface GetOrgUseCaseResponse {
  org: Org;
}

export class GetOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    id_org,
  }: GetOrgUseCaseRequest): Promise<GetOrgUseCaseResponse> {
    const org = await this.orgsRepository.findById(id_org);

    if (!org) throw new Error();

    return { org };
  }
}
