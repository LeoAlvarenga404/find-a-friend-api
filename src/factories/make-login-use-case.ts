import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository";
import { LoginUseCase } from "@/use-cases/login";

export function makeLoginUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new LoginUseCase(usersRepository);

  return useCase;
}
