import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository";
import { CreateOrgUseCase } from "@/use-cases/create-org";

export function makeCreateOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const usersRepository = new PrismaUsersRepository()
  const useCase = new CreateOrgUseCase(orgsRepository, usersRepository);

  return useCase;
}
