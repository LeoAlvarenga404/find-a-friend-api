import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository";
import { RegisterUseCase } from "@/use-cases/register-user";

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new RegisterUseCase(usersRepository);

  return useCase;
}
