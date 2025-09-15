import { makeGetOrgUseCase } from "@/factories/make-get-org-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getOrg(req: FastifyRequest, reply: FastifyReply) {
  const getOrgBodySchema = z.object({
    id_org: z.uuid(),
  });

  const params = getOrgBodySchema.parse(req.params);

  try {
    const getOrgUseCase = makeGetOrgUseCase();
    const { org } = await getOrgUseCase.execute(params);

    return reply.status(200).send({
      org,
    });
  } catch (err) {
    return reply.status(500).send({ message: err });
  }
}
