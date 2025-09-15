import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { SetToAdoptedPetStatusUseCase } from "@/use-cases/set-to-adopted-pet-status";

export function makeSetToAdoptedPetStatusUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const useCase = new SetToAdoptedPetStatusUseCase(petsRepository);

  return useCase;
}
