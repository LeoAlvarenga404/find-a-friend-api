import { makeLoginUseCase } from "@/factories/make-login-use-case";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function login(req: FastifyRequest, reply: FastifyReply) {
  const loginBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  });

  const body = loginBodySchema.parse(req.body);

  try {
    const loginUseCase = makeLoginUseCase();
    const { user } = await loginUseCase.execute(body);

    const accessToken = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id_user,
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id_user,
          expiresIn: "14d",
        },
      }
    );

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        accessToken,
      });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }
  }
}
