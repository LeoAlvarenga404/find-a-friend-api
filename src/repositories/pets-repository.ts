import { Pet, Prisma } from "@prisma/client";

export interface SearchPetParams {
  address: string;
  name?: string;
  about?: string;
  adopted?: boolean;
  age?: "CUB" | "ADULT";
  energy_level?: "HIGH" | "LOW" | "MEDIUM";
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  search(query: SearchPetParams, page: number): Promise<Pet[]>;
  findById(id_pet: string): Promise<Pet | null>;
  setToAdopted(id_pet: string): Promise<void>;
}
