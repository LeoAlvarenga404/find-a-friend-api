import { login } from "@/controllers/auth/login";
import { refresh } from "@/controllers/auth/refresh";
import { register } from "@/controllers/auth/register";
import { FastifyInstance } from "fastify";

export async function authRoutes(app: FastifyInstance) {
  app.post("/register", register);
  app.post("/login", login);
  app.patch("/token/refresh", refresh);
}
