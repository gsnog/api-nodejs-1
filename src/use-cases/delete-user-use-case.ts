
import { UsersRepository } from "@/repositories/users-repositories";
import { User } from "@prisma/client";
import { ResourceNotFindError } from "./errors/resource-not-found-error";


interface DeleteUserUseCaseRequest{
    userId: number;
}

interface DeleteUserUseCaseResponse{
    user: User
}

export class DeleteUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({userId}: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
        const user = await this.usersRepository.delete(userId)

        if (!user) {
            throw new ResourceNotFindError()
        }

        return { user }
    }    
}