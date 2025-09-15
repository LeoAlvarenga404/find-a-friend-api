import request from "supertest";
import { app } from "@/app";

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { createAndAuthUser } from "@/utils/test/create-and-auth-user";

describe("Get Pet (e2e)", async () => {
  beforeEach(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it("should be able to get pet by id", async () => {
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

    const response = await request(app.server)
      .get(`/pets/${petResponse.body.id_pet}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(200);
  });
});
