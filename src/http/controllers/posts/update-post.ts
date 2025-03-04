import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { UpdatePostUseCase } from "@/use-cases/update-post-use-case";
import { PrismaPostRepository } from "@/repositories/prisma/prisma-posts-repositories";
import { ResourceNotFindError } from "@/use-cases/errors/resource-not-found-error";

export async function updatePost(request: FastifyRequest, reply: FastifyReply) {
    console.log("Recebida requisição para atualizar post.");

    const updateParamsSchema = z.object({
        id: z.coerce.number()
    });

    const updateBodySchema = z.object({
        titulo: z.string().optional(),
        conteudo: z.string().optional()
    });

    const { id } = updateParamsSchema.parse(request.params);
    const { titulo, conteudo } = updateBodySchema.parse(request.body);

    try {
        const prismaPostRepository = new PrismaPostRepository();
        const updatePostUseCase = new UpdatePostUseCase(prismaPostRepository);

        const { post } = await updatePostUseCase.execute({ id, titulo, conteudo });

        return reply.status(200).send(post);
    } catch (err) {
        console.error("ERRO AO ATUALIZAR POST:", err);

        if (err instanceof ResourceNotFindError) {
            return reply.status(404).send({ message: err.message });
        }

        return reply.status(500).send({
            message: "Erro interno ao atualizar post",
            error: err instanceof Error ? err.stack : "Erro desconhecido"
        });
    }
}
