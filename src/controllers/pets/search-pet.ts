import { makeSearchPetsUseCase } from "@/factories/make-search-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function searchPet(req: FastifyRequest, reply: FastifyReply) {
  const searchPetQuerySchema = z.object({
    address: z.string(),
    name: z.string().optional(),
    about: z.string().optional(),
    adopted: z.boolean().default(false),
    age: z.enum(["CUB", "ADULT"]).optional(),
    energy_level: z.enum(["HIGH", "LOW", "MEDIUM"]).optional(),
    page: z.coerce.number(),
  });

  const { page: pagination, ...query } = searchPetQuerySchema.parse(req.query);

  try {
    const searchPetUseCase = makeSearchPetsUseCase();
    const { pets, page } = await searchPetUseCase.execute({
      query,
      page: pagination,
    });

    return reply.status(200).send({
      pets,
      page,
    });
  } catch (err) {
    return reply.status(500).send({ message: err });
  }
}
