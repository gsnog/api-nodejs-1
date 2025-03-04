import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { FindPostsByUserIdUseCase } from "@/use-cases/find-posts-by-user-id-use-case";
import { PrismaPostRepository } from "@/repositories/prisma/prisma-posts-repositories";

export async function findPostsByUser(request: FastifyRequest, reply: FastifyReply) {
    console.log("Recebida requisição para buscar posts por usuário.");

    const findParamsSchema = z.object({
        userId: z.coerce.number() 
    });

    const { userId } = findParamsSchema.parse(request.params);

    try {
        const prismaPostRepository = new PrismaPostRepository();
        const findPostsByUserIdUseCase = new FindPostsByUserIdUseCase(prismaPostRepository);

        const { posts } = await findPostsByUserIdUseCase.execute({ userId });

        return reply.status(200).send(posts);
    } catch (err) {
        console.error("ERRO AO BUSCAR POSTS DO USUÁRIO:", err);

        return reply.status(500).send({
            message: "Erro interno ao buscar posts do usuário",
            error: err instanceof Error ? err.stack : "Erro desconhecido"
        });
    }
}
