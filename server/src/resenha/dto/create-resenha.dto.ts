import { MinLength, MaxLength } from "class-validator";

export class CreateResenhaDto {
    @MinLength(2, {
        message: 'A mensagem precisa ter pelo menos 2 caracteres!'
    })
    @MaxLength(256, {
        message: 'A mensagem precisa ter no máximo 256 caracteres!'
    })
    
    content: string;

    sender: number;
    receiver: number;
}
