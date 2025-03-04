import { Prisma, User } from "@prisma/client";

export interface UserUpdateInput {
    nome?: string
    email?: string
    password?: string
    foto?: string
}


export interface UsersRepository{
    create(data: Prisma.UserCreateInput): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(userId: number): Promise<User | null>;
    delete(id: number): Promise<User | null>;  
    update(id:number, data: UserUpdateInput): Promise<User | null>;
}