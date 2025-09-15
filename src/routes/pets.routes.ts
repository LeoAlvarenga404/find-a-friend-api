import { verifyJWT } from "@/controllers/middlewares/verify-jwt";
import { verifyUserRole } from "@/controllers/middlewares/verify-user-role";
import { createPet } from "@/controllers/pets/create-pet";
import { getPet } from "@/controllers/pets/get-pet";
import { searchPet } from "@/controllers/pets/search-pet";
import { setToAdoptedPetStatus } from "@/controllers/pets/set-to-adopted-pet-status";
import { FastifyInstance } from "fastify";

export async function petsRoutes(app: FastifyInstance) {
  app.addHook("preHandler", async (req, res) => {
    await verifyJWT(req, res);
  });
  app.post("/pets", { preHandler: [verifyUserRole("ORG")] }, createPet);
  app.get("/pets/:id_pet", getPet);
  app.get("/pets", searchPet);
  app.patch(
    "/pets/adopted/:id_pet",
    { preHandler: [verifyUserRole("ORG")] },
    setToAdoptedPetStatus
  );
}
