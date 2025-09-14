import { Pet, Prisma } from "@prisma/client";

export interface SearchPetParams {
  address: string;
  name?: string;
  about?: string;
  adopted?: boolean;
  age?: string;
  energy_level?: string;
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  search(query: SearchPetParams, page: number): Promise<Pet[]>;
}
