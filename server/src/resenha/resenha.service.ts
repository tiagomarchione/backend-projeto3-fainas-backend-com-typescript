import { Injectable } from '@nestjs/common';
import { CreateResenhaDto } from './dto/create-resenha.dto';
import { Resenha } from './resenha.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class ResenhaService {
  constructor(
    @InjectRepository(Resenha)
    private readonly resenhaRepository: EntityRepository<Resenha>,
  ) {}
  
  async create(createResenhaDto: CreateResenhaDto) {
    const resenha = this.resenhaRepository.create(createResenhaDto);
    await this.resenhaRepository.flush();
    return resenha;
  }

  async findAll(senderId: number, receiverId: number) {
    const resenhas = await this.resenhaRepository.find({
     $or: [
      {
        sender: senderId,
        receiver: receiverId,
      },
      {
        sender: receiverId,
        receiver: senderId,
      }
     ] 
    }, {
      orderBy: {
        createdAt: 'ASC',
      }
    });
    return resenhas;
  }
}
