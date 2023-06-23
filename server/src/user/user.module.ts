import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './user.entity';
import { UserController } from './user.controller';

@Module({
    imports: [MikroOrmModule.forFeature([User])],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
