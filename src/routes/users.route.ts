import { register } from "@/controllers/users/register";
import { FastifyInstance } from "fastify";

export async function userRoutes(app: FastifyInstance) {
  app.post("/register", register);
}
