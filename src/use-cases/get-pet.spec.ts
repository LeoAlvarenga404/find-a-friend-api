import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { it, describe, expect, beforeEach } from "vitest";
import { GetPetUseCase } from "./get-pet";
import { Pet } from "@prisma/client";

let petsRepository: InMemoryPetsRepository;
let sut: GetPetUseCase;

describe("Get Pet", async () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository();
    sut = new GetPetUseCase(petsRepository);
  });

  it("should be able to get pet by id", async () => {
    await petsRepository.create({
      id_pet: "pet-01",
      name: "Pet 1",
      org_id: "org-1",
      energy_level: "LOW",
      address: "Rua Teste",
      age: "ADULT",
      adopted: false,
      about: null,
      photo_url: null,
    });

    await petsRepository.create({
      id_pet: "pet-02",
      name: "Pet 2",
      org_id: "org-1",
      address: "Rua Teste",
      energy_level: "LOW",
      age: "CUB",
      adopted: true,
      about: null,
      photo_url: null,
    });

    const { pet } = await sut.execute({
      id_pet: "pet-02",
    });

    expect(pet).toEqual(
      expect.objectContaining({
        id_pet: "pet-02",
      })
    );

    
  });
});
