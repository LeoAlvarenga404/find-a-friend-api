import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { SearchPetsUseCase } from "@/use-cases/search-pets";

export function makeSearchPetsUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const useCase = new SearchPetsUseCase(petsRepository);

  return useCase;
}
