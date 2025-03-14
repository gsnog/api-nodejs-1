
import { compare, hash } from "bcryptjs"
import { UserAlreadyExists } from "@/use-cases/errors/user-already-exists-error"
import { User } from "@prisma/client"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"
import { UsersRepository } from "@/repositories/users-repositories"

interface AuthenticateUseCaseRequest{
    email: string, 
    password: string
}

interface AuthenticateUseCaseResponse {
    user: User 
}

export class AuthenticateUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({email, password}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse>{
        const user = await this.usersRepository.findByEmail(email)
    
        if (!user) {
            throw new InvalidCredentialsError() 
        }
        
        const doesPasswordMatches = await compare(password, user.password)

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError() 
        }
        return { user }
        
    }    
}