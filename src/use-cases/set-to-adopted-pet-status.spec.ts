import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { it, describe, expect, beforeEach } from "vitest";
import { SetToAdoptedPetStatusUseCase } from "./set-to-adopted-pet-status";

let petsRepository: InMemoryPetsRepository;
let sut: SetToAdoptedPetStatusUseCase;

describe("Set status pet to adopted", async () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository();
    sut = new SetToAdoptedPetStatusUseCase(petsRepository);
  });

  it("should be able to set adopted pet status to true", async () => {
    await petsRepository.create({
      id_pet: "pet-01",
      name: "Pet 1",
      id_org: "org-1",
      energy_level: "LOW",
      address: "Rua Teste",
      age: "ADULT",
      adopted: false,
      about: null,
      photo_url: null,
    });

    await sut.execute("pet-01");

    const pet = await petsRepository.findById("pet-01");

    expect(pet).toEqual(
      expect.objectContaining({
        adopted: true,
      })
    );
  });
});
