import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface GetPetUseCaseRequest {
  id_pet: string;
}

interface GetPetUseCaseResponse {
  pet: Pet | null;
}

export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id_pet,
  }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(id_pet);

    return { pet };
  }
}
