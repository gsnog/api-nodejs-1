import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { RegisterPostUseCase } from "@/use-cases/register-post-use-case"
import { PrismaPostRepository } from "@/repositories/prisma/prisma-posts-repositories"
import { TitleAlreadyExists } from "@/use-cases/errors/title-already-exists"

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        titulo: z.string(), 
        conteudo: z.string(), 
        userId: z.number()
    });

    const { titulo, conteudo, userId } = registerBodySchema.parse(request.body);

    try {
        const prismaPostRepository = new PrismaPostRepository(); 
        const registerUseCase = new RegisterPostUseCase(prismaPostRepository); 

        await registerUseCase.execute({
            titulo,
            conteudo,
            userId
        });
    } catch (err) {
        console.error("ERRO AO REGISTRAR POST:", err); 
        if (err instanceof TitleAlreadyExists) {
            return reply.status(409).send({ message: err.message });
        }
        return reply.status(500).send({ message: "Erro interno no servidor", error: err });
    }

    return reply.status(201).send("Post criado com sucesso");
}

    