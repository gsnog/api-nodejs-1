import { prisma } from "@/lib/prisma";
import { Post, Prisma } from "@prisma/client";
import { PostRepository, PostUpdateInput } from "../posts-repositories";



export class PrismaPostRepository implements PostRepository {
    async update(id: number, data: PostUpdateInput): Promise<Post | null> {
        const post = await prisma.post.update({
            where: { id },
        data: {
            titulo: data.titulo,
            conteudo: data.conteudo 
        }
        })
        return post
    }
    async delete(id: number): Promise<Post | null> {
        const post = await prisma.post.delete({
            where: { id },
        });
        return post;
    }          
    async findById(id: number) {
        const post = await prisma.post.findUnique({
            where: {
                id
            }
        })
        return post
    }

    async findByUserId(userId: number): Promise<Post[]> {
        const posts = await prisma.post.findMany({
            where: { userId }
        });
    
        return posts || [];
    }
    
    

    async create(data: Prisma.PostUncheckedCreateInput){
        const post = await prisma.post.create({
            data
        })
        return post
    }

    async findAll(): Promise<Post[]> {
        return await prisma.post.findMany(); 
    }
}