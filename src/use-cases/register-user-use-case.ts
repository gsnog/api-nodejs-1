import { UsersRepository } from "@/repositories/users-repositories"
import { hash } from "bcryptjs"
import { UserAlreadyExists } from "./errors/user-already-exists-error"


interface RegisterUseCaseRequest{
    nome: string, 
    email: string, 
    password: string
    foto: string
}

export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({nome, email, password, foto}: RegisterUseCaseRequest){
        const userWithSameEmail = await this.usersRepository.findByEmail(email)
    
        if (userWithSameEmail) {
            throw new UserAlreadyExists() 
        }
    
        const password_hash = await hash(password, 6)

        await this.usersRepository.create({
            nome,
            email,
            password: password_hash,
            foto,
        })
    }    
}

export { UserAlreadyExists }
