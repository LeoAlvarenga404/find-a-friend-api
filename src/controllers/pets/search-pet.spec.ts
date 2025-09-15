import request from "supertest";
import { app } from "@/app";

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { createAndAuthUser } from "@/utils/test/create-and-auth-user";

describe("Search Pet (e2e)", async () => {
  beforeEach(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it("should be able to search a pet by query", async () => {
    const { accessToken } = await createAndAuthUser(app, true);

    const org = await prisma.org.findFirst();

    for (let i = 1; i <= 5; i++) {
      await request(app.server)
        .post("/pets")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          name: "Pet 1",
          id_org: org?.id_org,
          about: "lorem ipsum dolor sit amet.",
          address: org?.address,
          age: i % 2 === 0 ? "CUB" : "ADULT",
          energy_level: i === 1 ? "LOW" : "HIGH",
          adopted: false,
          photo_url: null,
        });
    }

    const response = await request(app.server)
      .get("/pets")
      .set("Authorization", `Bearer ${accessToken}`)
      .query({
        address: "Rua da Agua",
        age: "CUB",
        page: 1,
      });

    const { pets } = response.body;
    expect(pets).toHaveLength(2);
  });
});
