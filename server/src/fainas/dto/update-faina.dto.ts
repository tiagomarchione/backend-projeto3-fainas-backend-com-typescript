import {MinLength, MaxLength, IsString, IsDate, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateFainaDto } from './create-faina.dto';
import { Type } from 'class-transformer';

export class UpdateFainaDto extends PartialType(CreateFainaDto) {
    @IsOptional()
    @IsString()
    @MinLength(8, {
        message: 'O título precisa ter pelo menos 8 caracteres'
    })
    @MaxLength(64, {
        message: 'O título precisa ter no máximo 64 caracteres'
    })
    title: string;

    @IsOptional()
    @IsString()
    @MinLength(32, {
        message: 'A descrição precisa ter pelo menos 32 caracteres'
    })
    @MaxLength(256, {
        message: 'A descrição precisa ter no máximo 256 caracteres'
    })
    description: string;

    @IsOptional()
    @IsString()
    @MinLength(4, {
        message: 'O subtítulo precisa ter pelo menos 4 caracteres'
    })
    @MaxLength(16, {
        message: 'O subtítulo precisa ter no máximo 16 caracteres'
    })
    category: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    deadline: Date;
}
