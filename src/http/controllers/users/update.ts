import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { ResourceNotFindError } from "@/use-cases/errors/resource-not-found-error"
import { UpdateUserUseCase } from "@/use-cases/update-user-use-case"


export async function update(request: FastifyRequest, reply: FastifyReply){
    const updateParamsSchema = z.object({
        userId: z.coerce.number() 
    })
    

    const updateBodySchema = z.object({
        nome: z.string().optional(),
        email: z.string().email().optional(), 
        password: z.string().min(6).optional(),
        foto: z.string().optional()
    })

    const {userId} = updateParamsSchema.parse(request.params)
    const { nome, email, password, foto } = updateBodySchema.parse(request.body)

    try {

        const prismaUsersRepository = new PrismaUsersRepository()
        const updateUserUseCase = new UpdateUserUseCase(prismaUsersRepository)
        const user = await updateUserUseCase.execute({
            userId,
            data: { nome, email, password, foto }
        })
        
        return reply.status(200).send({ user })
    } catch (err) {
        if (err instanceof ResourceNotFindError) {
            return reply.status(404).send({message: err.message});
        }
        throw err     
    }

    return reply.status(200).send()
}