import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetUseCase } from "@/use-cases/get-pet";
import { SearchPetsUseCase } from "@/use-cases/search-pets";

export function makeGetPetsUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const useCase = new GetPetUseCase(petsRepository);

  return useCase;
}
