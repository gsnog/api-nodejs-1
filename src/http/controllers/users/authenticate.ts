import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { AuthenticateUseCase } from "@/use-cases/authenticate-use-case";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);
    const { user } = await authenticateUseCase.execute({
      email,
      password,
    });

    // Gerar os tokens corretamente
    const token = await reply.jwtSign({}, { sub: user.id.toString() });
    const refreshToken = await reply.jwtSign({}, { sub: user.id.toString(), expiresIn: "7d" });

    return reply
      .status(200)
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: "strict",
        httpOnly: true,
      })
      .send({ token });

  } catch (err) {
    return reply.status(401).send();
  }
}

