import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { app } from "@/app";
import { createAndAuthUser } from "@/utils/test/create-and-auth-user";
import request from "supertest";
describe("Refresh (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to refresh access token", async () => {
    await request(app.server).post("/register").send({
      name: "Leonardo Prado",
      email: "leonardo@gmail.com",
      password: "123456",
    });

    const loginResponse = await request(app.server).post("/login").send({
      email: "leonardo@gmail.com",
      password: "123456",
    });

    const cookies = loginResponse.get("Set-Cookie");
    const response = await request(app.server)
      .patch("/token/refresh")
      .set("Cookie", cookies ?? [])
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      accessToken: expect.any(String),
    });
  });
});
