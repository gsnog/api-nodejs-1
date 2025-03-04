import { PostRepository } from "@/repositories/posts-repositories";
import { Post } from "@prisma/client";
import { ResourceNotFindError } from "./errors/resource-not-found-error";


interface FindPostByIdUseCaseRequest{
    id: number;
}

interface FindPostByIdUseCaseResponse {
    post: Post
}

export class FindPostByIdUseCase {
    constructor(private postRepository: PostRepository) {}

    async execute({ id }: FindPostByIdUseCaseRequest): Promise<FindPostByIdUseCaseResponse> {
        const post = await this.postRepository.findById(id);

        if (!post) {
            throw new ResourceNotFindError();
        }
        return { post };
    }
}