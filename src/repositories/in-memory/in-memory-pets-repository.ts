import { Prisma, Pet } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { PetsRepository, SearchPetParams } from "../pets-repository";

export class InMemoryPetsRepository implements PetsRepository {
  private pets: Pet[] = [];
  async findById(id_pet: string) {
    const pet = this.pets.find((pet) => pet.id_pet === id_pet);

    if (!pet) return null;

    return pet;
  }
  async setToAdopted(id_pet: string) {
    const index = this.pets.findIndex((pet) => pet.id_pet === id_pet);

    if (index >= 0) {
      this.pets[index].adopted = true;
    }
  }

  async search(query: SearchPetParams, page: number) {
    if (!query.address || query.address.trim().length <= 0) {
      throw new Error();
    }

    return this.pets
      .filter((pet) => {
        return (
          (!query.about || pet.about?.includes(query.about)) &&
          (!query.address || pet.address?.includes(query.address)) &&
          (!query.age || pet.age?.includes(query.age)) &&
          (!query.energy_level ||
            pet.energy_level?.includes(query.energy_level)) &&
          (!query.name || pet.name?.includes(query.name))
        );
      })
      .slice((page - 1) * 20, page * 20);
  }
  async create(data: Prisma.PetUncheckedCreateInput) {
    const {
      name,
      org_id,
      about,
      age,
      energy_level,
      photo_url,
      address,
      adopted,
      id_pet,
    } = data;
    const pet = {
      id_pet: id_pet ?? randomUUID(),
      name,
      org_id,
      age: age ?? null,
      about: about ?? null,
      address,
      adopted,
      energy_level: energy_level ?? null,
      photo_url: photo_url ?? null,
    };

    this.pets.push(pet);

    return pet;
  }
}
