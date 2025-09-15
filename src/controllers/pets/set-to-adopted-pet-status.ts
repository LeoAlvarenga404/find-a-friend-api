import { makeSearchPetsUseCase } from "@/factories/make-search-pet-use-case";
import { makeSetToAdoptedPetStatusUseCase } from "@/factories/make-set-to-adopted-pet-status-use-case";
import { SetToAdoptedPetStatusUseCase } from "@/use-cases/set-to-adopted-pet-status";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function setToAdoptedPetStatus(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const searchPetQueryParams = z.object({
    id_pet: z.string(),
  });

  const param = searchPetQueryParams.parse(req.params);

  try {
    const setToAdoptedPetStatusUseCase = makeSetToAdoptedPetStatusUseCase();
    await setToAdoptedPetStatusUseCase.execute(param.id_pet);

    return reply.status(204).send();
  } catch (err) {
    return reply.status(500).send({ message: err });
  }
}
