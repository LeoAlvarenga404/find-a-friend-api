import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
interface LoginUseCaseRequest {
  email: string;
  password: string;
}
interface LoginUseCaseResponse {
  user: User;
}
export class LoginUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: LoginUseCaseRequest): Promise<LoginUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const verifyPassword = await compare(password, user.password_hash);

    if (!verifyPassword) {
      throw new InvalidCredentialsError();
    }

    return {
      user
    }

  }
}
