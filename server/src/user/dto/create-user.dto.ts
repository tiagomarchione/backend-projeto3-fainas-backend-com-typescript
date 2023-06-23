import { MinLength, MaxLength, IsEmail } from "class-validator";

const textsErrors : any = {
    nameMinLength: "O nome precisa ter pelo menos 3 caracteres!",
    nameMaxLength: "O nome precisa ter no máximo 16 caracteres!",
    surnameMinLength: "O sobrenome precisa ter pelo menos 3 caracteres!",
    surnameMaxLength: "O sobrenome precisa ter no máximo 16 caracteres!",

};

export class CreateUserDto {
    @MinLength(3, { message: "O nome precisa ter pelo menos 3 caracteres!"})
    @MaxLength(16, { message: "O nome precisa ter no máximo 16 caracteres!"})
    name: string;
    
    @MinLength(3, { message: "O sobrenome precisa ter pelo menos 3 caracteres!"})
    @MaxLength(16, { message: "O sobrenome precisa ter no máximo 32 caracteres!"})
    surname: string;
    
    @IsEmail(undefined, {message: "Digite um email válido!"})
    email: string;

    @MinLength(8, { message: "A senha precisa ter pelo menos 8 caracteres!"})
    @MaxLength(16, { message: "A senha precisa ter no máximo 16 caracteres!"})
    password: string;
};