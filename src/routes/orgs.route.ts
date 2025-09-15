import { verifyJWT } from "@/controllers/middlewares/verify-jwt";
import { createOrg } from "@/controllers/orgs/create-org";
import { getOrg } from "@/controllers/orgs/get-org";
import { FastifyInstance } from "fastify";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", createOrg);
  app.get("/orgs/:id_org", { preHandler: [verifyJWT] }, getOrg);
}
