import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { FindPostByIdUseCase } from "@/use-cases/get-post-by-id-use-case";
import { PrismaPostRepository } from "@/repositories/prisma/prisma-posts-repositories";
import { ResourceNotFindError } from "@/use-cases/errors/resource-not-found-error";

export async function findPostById(request: FastifyRequest, reply: FastifyReply) {
    console.log("Recebida requisição para buscar post por ID.");

    const findParamsSchema = z.object({
        id: z.coerce.number() 
    });

    const { id } = findParamsSchema.parse(request.params);

    try {
        const prismaPostRepository = new PrismaPostRepository();
        const findPostByIdUseCase = new FindPostByIdUseCase(prismaPostRepository);

        const { post } = await findPostByIdUseCase.execute({ id });

        return reply.status(200).send(post);
    } catch (err) {
        console.error("ERRO AO BUSCAR POST:", err);

        if (err instanceof ResourceNotFindError) {
            return reply.status(404).send({ message: err.message });
        }

        return reply.status(500).send({
            message: "Erro interno ao buscar post",
            error: err instanceof Error ? err.stack : "Erro desconhecido"
        });
    }
}
