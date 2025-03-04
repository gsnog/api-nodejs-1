import { Post } from "@prisma/client";
import { ResourceNotFindError } from "./errors/resource-not-found-error";
import { PostRepository } from "@/repositories/posts-repositories";

interface DeletePostUseCaseRequest {
    id: number;
}

export class DeletePostUseCase {
    constructor(private postRepository: PostRepository) {}

    async execute({ id }: DeletePostUseCaseRequest): Promise<Post | null> {
        const post = await this.postRepository.delete(id);

        if (!post) {
            throw new ResourceNotFindError();
        }

        return post;
    }
}