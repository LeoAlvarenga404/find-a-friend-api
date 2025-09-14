import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findById(id_user: string) {
    const user = this.items.find((item) => item.id_user === id_user);

    if (!user) return null;

    return user;
  }
  async changeRoleToOrg(id_user: string) {
    let user = await this.findById(id_user);

    if (user) {
      user.role = "ORG";
    }
  }
  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) return null;

    return user;
  }
  async create(data: Prisma.UserCreateInput) {
    const user = {
      id_user: data.id_user ?? '',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      role: data.role ?? "MEMBER",
    };

    this.items.push(user);

    return user;
  }
}
