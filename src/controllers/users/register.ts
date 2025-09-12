import { makeRegisterUseCase } from "@/factories/make-register-use-case";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  });

  const body = registerBodySchema.parse(req.body);

  try {
    const registerUseCase = makeRegisterUseCase();
    await registerUseCase.execute(body);

    return reply.status(201).send();
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }
  }
}
