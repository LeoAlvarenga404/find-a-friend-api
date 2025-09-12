import fastify from "fastify";
import { userRoutes } from "@/routes/users.route";
import z, { ZodError } from "zod";
import { env } from "./env";

export const app = fastify();

app.register(userRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation Error.", issues: z.formatError(error) });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return reply
    .status(500)
    .send({ message: `Internal server error: ${error.message}` });
});
