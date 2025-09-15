import request from "supertest";
import { app } from "@/app";

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { createAndAuthUser } from "@/utils/test/create-and-auth-user";

describe("Set To Adopted Pet Status (e2e)", async () => {
  beforeEach(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it("should be able to set pet status to adopted", async () => {
    const { accessToken } = await createAndAuthUser(app, true);

    const org = await prisma.org.findFirst();

    const petResponse = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Pet 1",
        id_org: org?.id_org,
        about: "lorem ipsum dolor sit amet.",
        address: org?.address,
        age: "CUB",
        energy_level: "LOW",
        adopted: false,
        photo_url: null,
      });

    const { id_pet } = petResponse.body.pet;
    await request(app.server)
      .patch(`/pets/adopted/${id_pet}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send();

    const response = await request(app.server)
      .get(`/pets/${id_pet}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send();

    expect(response.body.pet.adopted).toEqual(true);
  });
});
