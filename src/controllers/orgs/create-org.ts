import { makeCreateOrgUseCase } from "@/factories/make-create-org-use-case";
import { Org } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createOrg(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    id_user: z.uuid(),
    address: z.string(),
    zip_code: z.string(),
    whatsapp: z.string(),
  });

  const body = registerBodySchema.parse(req.body);

  try {
    const createOrgUseCase = makeCreateOrgUseCase();
    const { org } = await createOrgUseCase.execute(body);

    return reply.status(201).send({ org });
  } catch (err) {
    return reply.status(500).send({ message: err });
  }
}
