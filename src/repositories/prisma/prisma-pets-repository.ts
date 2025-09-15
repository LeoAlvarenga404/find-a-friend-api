import { Prisma, Pet } from "@prisma/client";
import { PetsRepository, SearchPetParams } from "../pets-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }
  async search(query: SearchPetParams, page: number) {
    const pets: Pet[] = await prisma.pet.findMany({
      where: {
        address: query.address,
        about: query.about,
        adopted: query.adopted,
        age: query.age,
        energy_level: query.energy_level,
        name: query.name,
      },
    });

    return pets;
  }
  async findById(id_pet: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id_pet,
      },
    });

    return pet;
  }
  async setToAdopted(id_pet: string) {
    await prisma.pet.update({
      where: {
        id_pet,
      },
      data: {
        adopted: true,
      },
    });
  }
}
