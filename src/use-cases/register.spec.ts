import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { expect, it, describe, beforeEach } from "vitest";
import { RegisterUseCase } from "./register-user";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", async () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should be able to register", async () => {
    const body = {
      name: "Leonardo Prado",
      email: "leonardo@gmail.com",
      password: "123456",
    };

    const { user } = await sut.execute(body);

    expect(user.id_user).toEqual(expect.any(String));
  });

  it("should not be able to register if email already exists", async () => {
    const body = {
      name: "Leonardo Prado",
      email: "leonardo@gmail.com",
      password: "123456",
    };
    
    await sut.execute(body);

    expect(async () => await sut.execute(body)).rejects.toBeInstanceOf(
      UserAlreadyExistsError
    );
  });
});
