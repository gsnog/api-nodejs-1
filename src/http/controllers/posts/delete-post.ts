import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { ResourceNotFindError } from "@/use-cases/errors/resource-not-found-error";
import { PrismaPostRepository } from "@/repositories/prisma/prisma-posts-repositories";
import { DeletePostUseCase } from "@/use-cases/delete-post-use-case";

export async function deletePost(request: FastifyRequest, reply: FastifyReply) {
    const updateParamsSchema = z.object({
        id: z.coerce.number(),
    });

    const { id } = updateParamsSchema.parse(request.params);

    try {
        const prismaPostRepository = new PrismaPostRepository();
        const deletePostUseCase = new DeletePostUseCase(prismaPostRepository);

        await deletePostUseCase.execute({ id });

        return reply.status(204).send(); 
    } catch (err) {
        if (err instanceof ResourceNotFindError) {
            return reply.status(404).send({ message: err.message });
        }
        console.error(err); 
        return reply.status(500).send({ message: 'Internal Server Error' });
    }
}
