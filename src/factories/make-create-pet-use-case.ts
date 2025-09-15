import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { CreatePetUseCase } from "@/use-cases/create-pet";

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const useCase = new CreatePetUseCase(petsRepository);

  return useCase;
}
