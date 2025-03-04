import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserUseCase } from "@/use-cases/get-user-use-case";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();

   
    console.log("request.user:", request.user);
    console.log("Tipo de request.user.sub:", typeof request.user.sub);
    console.log("Valor de request.user.sub:", request.user.sub);

    const userId = Number(request.user.sub); 

    const prismaUsersRepository = new PrismaUsersRepository();
    const getUserUseCase = new GetUserUseCase(prismaUsersRepository);

    const { user } = await getUserUseCase.execute({ userId });

    return reply.status(200).send({
      user: {
        ...user,
        password: undefined,
      },
    });
  } catch (err) {
    console.error("Erro ao buscar perfil:", err);
    return reply.status(401).send({ error: "Token inválido ou não fornecido" });
  }
}
