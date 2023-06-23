import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { FainasService } from './fainas.service';
import { FainasController } from './fainas.controller';
import { Faina } from './faina.entity';
import { Comment } from '../comments/comment.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Faina, Comment])],
  controllers: [FainasController],
  providers: [FainasService]
})
export class FainasModule {}
