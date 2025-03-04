import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { UsersRepository, UserUpdateInput } from "../users-repositories";



export class PrismaUsersRepository implements UsersRepository {
    async update(id: number, data: UserUpdateInput): Promise<User | null> {
        const user = await prisma.user.update({
            where: { id },
        data: {
            nome: data.nome,
            email: data.email,
            password: data.password,
            foto: data.foto
        }
        })
        return user
    }
    async delete(id: number): Promise<User | null> {
        const user = await prisma.user.delete({
            where: {
                id
            }
        })
        return user
    }
    async findById(id: number) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        return user
    }
    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return user 
    }
    async create(data: Prisma.UserCreateInput){
        const user = await prisma.user.create({
            data
        })
        return user
    }
}