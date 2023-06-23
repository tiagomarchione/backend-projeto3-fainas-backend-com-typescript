import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';
import { CreateUserDto } from './dto/create-user.dto';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: EntityRepository<User>,
    ) {}

    async findById(id: number) {
        const user = await this.userRepository.findOneOrFail(id);
        await user.fainas.loadItems();
        return user;
    }

    findByEmail(email: string) {
        return this.userRepository.findOne({ email });
    }

    async getMyself(id: number) {
        const user = await this.userRepository.findOneOrFail(id);
        await user.fainas.loadItems();
        return user;
      }

    async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    await this.userRepository.flush();
    return user;
    }

    async setEmailVerified(userId) {
        const user = await this.userRepository.findOne(userId);
        user.isEmailVerified = true;
        await this.userRepository.flush();
        return user;
    }

    async uploadPicture(userId: number, picture: Buffer) {
        const picturePath = path.join('/public', 'pictures', `${userId}.jpeg`)
        try {
            await fs.writeFile(picturePath, picture);
        } catch (error) {
            console.log(error);
            return {
                success: false,
                pictureUrl: null,
            }
        }
        const user = await this.findById(userId);
        const pictureUrl = `/picture/${userId}.jpeg`;
        user.userPicture = pictureUrl;
        this.userRepository.flush();
        
        return {
            success: true,
            pictureUrl,
        };
    }
}
