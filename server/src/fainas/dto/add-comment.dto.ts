import { MinLength, MaxLength, IsString } from 'class-validator';

export class AddCommentDto {
    @IsString()
    @MinLength(32, {
        message: 'O comentário precisa ter pelo menos 32 caracteres'
    })
    @MaxLength(256, {
        message: 'O comentário precisa ter no máximo 256 caracteres'
    })
    message: string;
}
