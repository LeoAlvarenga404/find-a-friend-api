import { makeCreatePetUseCase } from "@/factories/make-create-pet-use-case";
import { Org } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createPet(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    id_org: z.uuid(),
    about: z.string().nullable(),
    address: z.string(),
    age: z.enum(["CUB", "ADULT"]),
    energy_level: z.enum(["LOW", "MEDIUM", "HIGH"]),
    adopted: z.boolean(),
    photo_url: z.string().nullable(),
  });

  const body = registerBodySchema.parse(req.body);

  try {
    const createPetUseCase = makeCreatePetUseCase();
    const { pet } = await createPetUseCase.execute(body);

    return reply.status(201).send({ pet });
  } catch (err) {
    return reply.status(500).send({ message: err });
  }
}
