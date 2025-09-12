import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { expect, it, describe, beforeEach } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { CreateOrgUseCase } from "./create-org";
import { hash } from "bcryptjs";

let orgsRepository: InMemoryOrgsRepository;
let usersRepository: InMemoryUsersRepository;
let sut: CreateOrgUseCase;

describe("Create Org Use Case", async () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateOrgUseCase(orgsRepository, usersRepository);
  });

  it("should be able to create a org", async () => {
    const user = await usersRepository.create({
      name: "Leonardo Prado",
      email: "leonardo@gmail.com",
      password_hash: await hash("123456", 6),
      role: "MEMBER",
    });

    const { org } = await sut.execute({
      id_user: user?.id_user,
      address: "Rua da Agua",
      whatsapp: "11950655398",
      zip_code: "13227-010",
    });

    expect(org.id_org).toEqual(expect.any(String));
  });

  it("should be able to update role to ORG", async () => {
    const user = await usersRepository.create({
      name: "Leonardo Prado",
      email: "leonardo@gmail.com",
      password_hash: await hash("123456", 6),
      role: "MEMBER",
    });

    await sut.execute({
      id_user: user?.id_user,
      address: "Rua da Agua",
      whatsapp: "11950655398",
      zip_code: "13227-010",
    });

    expect(user.role).toEqual("ORG");
  });
});
