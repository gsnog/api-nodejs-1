import { UsersRepository, UserUpdateInput } from "@/repositories/users-repositories";
import { Post } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import { ResourceNotFindError } from "./errors/resource-not-found-error";
import { PostRepository } from "@/repositories/posts-repositories";

interface UpdatePostUseCaseRequest {
    id: number;
    titulo?: string;
    conteudo?: string;
}

interface UpdatePostUseCaseResponse{
    post: Post
}

export class UpdatePostUseCase {
    constructor(private postRepository: PostRepository) {}

    async execute({id, titulo, conteudo}: UpdatePostUseCaseRequest): Promise<UpdatePostUseCaseResponse> {
        const post = await this.postRepository.findById(id)

        if (!post) {
            throw new ResourceNotFindError()
        }

        const postUpdated = await this.postRepository.update(id, { titulo, conteudo })
        if(!postUpdated){
            throw new ResourceNotFindError()  // handle resource not found error here if required
        }

        return { post }
    }    
}