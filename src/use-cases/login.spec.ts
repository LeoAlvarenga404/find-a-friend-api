import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { expect, it, describe, beforeEach } from "vitest";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { LoginUseCase } from "./login";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: LoginUseCase;

describe("Login Use Case", async () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new LoginUseCase(usersRepository);
  });

  it("should be able to login", async () => {
    await usersRepository.create({
      name: "Leonardo Prado",
      email: "leonardo.alvarenga@gmail.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "leonardo.alvarenga@gmail.com",
      password: "123456",
    });

    expect(user.id_user).toEqual(expect.any(String));
  });

  it("should not be able to login with wrong password", async () => {
    await usersRepository.create({
      name: "Leonardo Prado",
      email: "leonardo.alvarenga@gmail.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "leonardo.alvarenga@gmail.com",
        password: "12345678",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
