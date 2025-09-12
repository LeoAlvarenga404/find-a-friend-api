import { Prisma, User } from "@prisma/client";

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id_user: string): Promise<User | null>;
  changeRoleToOrg(id_user: string): Promise<void>;
}
