import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface CreatePetUseCaseRequest {
  name: string;
  id_org: string;
  about?: string | null;
  address: string;
  age?: "CUB" | "ADULT";
  energy_level?: "LOW" | "MEDIUM" | "HIGH";
  adopted: boolean;
  photo_url?: string | null;
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    id_org,
    about,
    age,
    address,
    energy_level,
    adopted,
    photo_url,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      id_org,
      about,
      age,
      address,
      energy_level,
      adopted,
      photo_url,
    });

    return { pet };
  }
}
