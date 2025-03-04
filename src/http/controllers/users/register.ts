import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { UserAlreadyExists } from "@/use-cases/errors/user-already-exists-error"
import { RegisterUseCase } from "@/use-cases/register-user-use-case"


export async function register(request: FastifyRequest, reply: FastifyReply){
    const registerBodySchema = z.object({
        nome: z.string(), 
        email: z.string().email(), 
        password: z.string().min(6),
        foto: z.string()
    })

    const {nome, email, password, foto} = registerBodySchema.parse(request.body)

    try {

        const prismaUsersRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisterUseCase(prismaUsersRepository)
        await registerUseCase.execute({
            nome, 
            email, 
            password,
            foto
        })
    } catch (err) {
        if (err instanceof UserAlreadyExists) {
            return reply.status(409).send({message: err.message});
        }
        throw err     
    }

    return reply.status(201).send("Usuário criado com sucesso")
}
    
