import { Module } from '@nestjs/common';
import { ResenhaService } from './resenha.service';
import { ResenhaController } from './resenha.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Resenha } from './resenha.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Resenha])],
  controllers: [ResenhaController],
  providers: [ResenhaService]
})
export class ResenhaModule {}
