import { makeGetPetsUseCase } from "@/factories/make-get-pet-use-case";
import { makeSearchPetsUseCase } from "@/factories/make-search-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPet(req: FastifyRequest, reply: FastifyReply) {
  const getPetParamsSchema = z.object({
    id_pet: z.string(),
  });

  const query = getPetParamsSchema.parse(req.params);

  try {
    const getPetsUseCase = makeGetPetsUseCase();
    const { pet } = await getPetsUseCase.execute(query);

    return reply.status(200).send({
      pet,
    });
  } catch (err) {
    return reply.status(500).send({ message: err });
  }
}
