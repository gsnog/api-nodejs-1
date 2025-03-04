import { Post, Prisma } from "@prisma/client";

export interface PostUpdateInput {
    titulo?: string
    conteudo?: string
}

export interface PostRepository {
    create(data: Prisma.PostUncheckedCreateInput): Promise<Post>;
    findById(postId: number): Promise<Post | null>; // 
    findByUserId(userId: number): Promise<Post[] | null>; 
    delete(id: number): Promise<Post | null>; 
    update(id: number, data: PostUpdateInput): Promise<Post | null>;
    findAll(): Promise<Post[] | null>;
}
