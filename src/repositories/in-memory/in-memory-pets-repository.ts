import { Prisma, Pet } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { randomUUID } from "node:crypto";
import { PetsRepository, SearchPetParams } from "../pets-repository";

export class InMemoryPetsRepository implements PetsRepository {
  private pets: Pet[] = [];

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
    } = data;
    const pet = {
      id_pet: randomUUID(),
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
