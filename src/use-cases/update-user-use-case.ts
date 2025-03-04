
import { UsersRepository, UserUpdateInput } from "@/repositories/users-repositories";
import { User } from "@prisma/client";

import { compare, hash } from "bcryptjs";
import { ResourceNotFindError } from "./errors/resource-not-found-error";

interface UpdateUserUseCaseRequest{
    userId: number;
    data: UserUpdateInput;
}

interface UpdateUserUseCaseResponse{
    user: User
}

export class UpdateUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({userId, data}: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
        const user = await this.usersRepository.findById(userId)

        if (!user) {
            throw new ResourceNotFindError()
        }

        if (data.password) {
            const isSamePassword = await compare(data.password, user.password)
            if (isSamePassword) {
                throw new Error("Password cannot be the same as the existing one")
            }

            data.password = await hash(data.password, 6)
        }

        const userUpdated = await this.usersRepository.update(userId, data)
        if(!userUpdated){
            throw new ResourceNotFindError()  // handle resource not found error here if required
        }

        return { user }
    }    
}