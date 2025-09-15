import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";

import { it, describe, expect, beforeEach } from "vitest";
import { SearchPetsUseCase } from "./search-pets";
import { Pet } from "@prisma/client";

let petsRepository: InMemoryPetsRepository;
let sut: SearchPetsUseCase;

describe("Search Pet", async () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository();
    sut = new SearchPetsUseCase(petsRepository);
  });

  it("should be able to seatch pets with many params", async () => {
    const createPets: Pet[] = [
      {
        id_pet: "pet-01",
        name: "Pet 1",
        id_org: "org-1",
        energy_level: "LOW",
        address: "Rua Teste",
        age: "ADULT",
        adopted: false,
        about: null,
        photo_url: null,
      },
      {
        id_pet: "pet-02",
        name: "Pet 2",
        id_org: "org-2",
        energy_level: "MEDIUM",
        address: "Rua sem Nome",
        age: "ADULT",
        about: null,
        adopted: true,
        photo_url: null,
      },
      {
        id_pet: "pet-03",
        name: "Pet 3",
        id_org: "org-1",
        address: "Rua Teste",
        energy_level: "LOW",
        age: "CUB",
        adopted: true,
        about: null,
        photo_url: null,
      },
    ];

    for (const pet of createPets) {
      await petsRepository.create({
        name: pet.name,
        id_org: pet.id_org,
        energy_level: pet.energy_level,
        age: pet.age,
        adopted: pet.adopted,
        about: pet.about,
        address: pet.address,
        photo_url: pet.photo_url,
      });
    }

    const { page, pets } = await sut.execute({
      query: {
        address: "Rua Teste",
        age: "CUB",
        energy_level: "LOW",
      },
      page: 1,
    });

    expect(pets).toHaveLength(1);

    expect(pets).toEqual([
      expect.objectContaining({
        age: "CUB",
      }),
    ]);
  });

  it("should not be able to search pet if not exist address param.", async () => {
    await expect(
      sut.execute({
        query: {
          address: "",
        },
        page: 1,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to search all the adopted pets", async () => {
    const createPets: Pet[] = [
      {
        id_pet: "pet-01",
        name: "Pet 1",
        id_org: "org-1",
        energy_level: "LOW",
        address: "Rua Teste",
        age: "ADULT",
        adopted: false,
        about: null,
        photo_url: null,
      },
      {
        id_pet: "pet-02",
        name: "Pet 2",
        id_org: "org-2",
        energy_level: "MEDIUM",
        address: "Rua sem Nome",
        age: "ADULT",
        about: null,
        adopted: true,
        photo_url: null,
      },
    ];

    for (const pet of createPets) {
      await petsRepository.create({
        name: pet.name,
        id_org: pet.id_org,
        energy_level: pet.energy_level,
        age: pet.age,
        adopted: pet.adopted,
        about: pet.about,
        address: pet.address,
        photo_url: pet.photo_url,
      });
    }

    const { page, pets } = await sut.execute({
      query: {
        address: "Rua sem Nome",
        adopted: true,
      },
      page: 1,
    });

    expect(pets).toHaveLength(1);
  });
});
