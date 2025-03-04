import { PostRepository } from "@/repositories/posts-repositories"
import { TitleAlreadyExists } from "./errors/title-already-exists"


interface RegisterUseCaseRequest{
    titulo: string,
    conteudo: string, 
    userId: number
}

export class RegisterPostUseCase {
    constructor(private PostRepository: PostRepository) {}

    async execute({titulo, conteudo, userId}: RegisterUseCaseRequest){
        const postWithSameTitle = await this.PostRepository.findByTitle(titulo)
    
        if (postWithSameTitle) {
            throw new TitleAlreadyExists
        }
    

        await this.PostRepository.create({
            titulo,
            conteudo, 
            userId
        })
    }    
}

export { TitleAlreadyExists }