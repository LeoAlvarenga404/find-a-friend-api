import { UsersRepository } from "@/repositories/users-repository";
import { Org } from "@prisma/client";

import { OrgsRepository } from "@/repositories/orgs-repository";

interface CreateOrgUseCaseRequest {
  id_user: string;
  address: string;
  zip_code: string;
  whatsapp: string;
}

interface CreateOrgUseCaseResponse {
  org: Org;
}

export class CreateOrgUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    address,
    id_user,
    whatsapp,
    zip_code,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const user = await this.usersRepository.findById(id_user);

    if (!user) {
      throw new Error();
    }

    const org = await this.orgsRepository.create({
      address,
      id_user,
      name: user.name,
      whatsapp,
      zip_code,
    });

    await this.usersRepository.changeRoleToOrg(id_user);

    return { org };
  }
}
