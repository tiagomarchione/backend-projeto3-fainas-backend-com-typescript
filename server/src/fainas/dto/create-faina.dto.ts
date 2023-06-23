import { Type } from 'class-transformer';
import { MinLength, MaxLength, IsString, IsDate } from 'class-validator';

export class CreateFainaDto {
    @IsString()
    @MinLength(8, {
        message: 'O título precisa ter pelo menos 8 caracteres'
    })
    @MaxLength(64, {
        message: 'O título precisa ter no máximo 64 caracteres'
    })
    title: string;

    @IsString()
    @MinLength(32, {
        message: 'A descrição precisa ter pelo menos 32 caracteres'
    })
    @MaxLength(256, {
        message: 'A descrição precisa ter no máximo 256 caracteres'
    })
    description: string;

    @IsString()
    @MinLength(4, {
        message: 'O subtítulo precisa ter pelo menos 4 caracteres'
    })
    @MaxLength(16, {
        message: 'O subtítulo precisa ter no máximo 16 caracteres'
    })
    category: string;

    @IsDate()
    @Type(() => Date)
    deadline: Date;

    user: number;
}
