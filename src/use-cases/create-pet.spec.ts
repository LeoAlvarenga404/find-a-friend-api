import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";

import { it, describe, expect, beforeEach } from "vitest";
import { CreatePetUseCase } from "./create-pet";

let petsRepository: InMemoryPetsRepository;
let sut: CreatePetUseCase;

describe("Create Pet", async () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository();
    sut = new CreatePetUseCase(petsRepository);
  });

  it("should be able to create a pet", async () => {
    const { pet } = await sut.execute({
      name: "Pet Teste",
      id_org: "org-01",
      address: "Rua Teste...",
      energy_level: "MEDIUM",
      about: "description...",
      adopted: true,
      age: "ADULT",
    });

    expect(pet.id_pet).toEqual(expect.any(String));
  });
});
