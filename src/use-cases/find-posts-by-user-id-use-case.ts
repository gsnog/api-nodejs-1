import { PostRepository } from "@/repositories/posts-repositories";
import { Post } from "@prisma/client";

interface FindPostsByUserIdUseCaseRequest {
    userId: number;
}

interface FindPostsByUserIdUseCaseResponse {
    posts: Post[]; // 
}

export class FindPostsByUserIdUseCase {
    constructor(private postRepository: PostRepository) {}

    async execute({ userId }: FindPostsByUserIdUseCaseRequest): Promise<FindPostsByUserIdUseCaseResponse> {
        console.log(`Buscando posts do usuário ID: ${userId}`);

        const posts = await this.postRepository.findByUserId(userId) || []; 

        return { posts };
    }
}


