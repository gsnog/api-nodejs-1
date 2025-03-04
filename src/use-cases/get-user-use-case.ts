
import { UsersRepository } from "@/repositories/users-repositories";
import { User } from "@prisma/client";
import { ResourceNotFindError } from "./errors/resource-not-found-error";


interface GetUserUseCaseRequest{
    userId: number;
}

interface GetUserUseCaseResponse{
    user: User
}

export class GetUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({userId}: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
        const user = await this.usersRepository.findById(userId)

        if (!user) {
            throw new ResourceNotFindError()
        }

        return { user }
    }    
}