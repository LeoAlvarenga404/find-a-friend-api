import { PetsRepository } from "@/repositories/pets-repository";

export class SetToAdoptedPetStatusUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(id_pet: string): Promise<void> {
    await this.petsRepository.setToAdopted(id_pet);
  }
}
