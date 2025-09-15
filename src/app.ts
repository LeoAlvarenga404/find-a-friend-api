import fastify from "fastify";
import { authRoutes } from "@/routes/auth.routes";
import z, { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { orgsRoutes } from "./routes/orgs.route";
import { petsRoutes } from "./routes/pets.routes";
export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCookie);

app.register(authRoutes);
app.register(orgsRoutes);
app.register(petsRoutes);

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
