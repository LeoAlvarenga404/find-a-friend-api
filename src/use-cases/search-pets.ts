import {
  PetsRepository,
  SearchPetParams,
} from "@/repositories/pets-repository";

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ query, page }: { query: SearchPetParams; page: number }) {
    if (!query.address) {
      throw new Error();
    }
    const filteredPets = await this.petsRepository.search(query, page);

    return {
      pets: filteredPets,
      page,
    };
  }
}
