import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaPostRepository } from "@/repositories/prisma/prisma-posts-repositories";

export async function list(request: FastifyRequest, reply: FastifyReply) {
    try {
        const prismaPostRepository = new PrismaPostRepository();
        const posts = await prismaPostRepository.findAll();

        return reply.status(200).send(posts);
    } catch (err) {
        console.error("Erro ao buscar posts:", err);
        return reply.status(500).send({ message: "Erro interno ao buscar posts." });
    }
}
