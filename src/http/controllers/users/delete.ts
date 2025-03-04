import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { ResourceNotFindError } from "@/use-cases/errors/resource-not-found-error"
import { DeleteUserUseCase } from "@/use-cases/delete-user-use-case"

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    const updateParamsSchema = z.object({
        userId: z.coerce.number() 
    })

    const { userId } = updateParamsSchema.parse(request.params)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const deleteUserUseCase = new DeleteUserUseCase(prismaUsersRepository)

        await deleteUserUseCase.execute({ userId }) // Apenas executa, não precisa armazenar

        return reply.status(204).send() // Status 204 significa "No Content"
    } catch (err) {
        if (err instanceof ResourceNotFindError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err
    }
}
