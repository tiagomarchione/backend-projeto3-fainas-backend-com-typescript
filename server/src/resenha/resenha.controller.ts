import { Controller, Get, Post, Body, Param, ParseIntPipe, Req, Request, Sse } from '@nestjs/common';
import { ResenhaService } from './resenha.service';
import { CreateResenhaDto } from './dto/create-resenha.dto';
import { map, Subject } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Resenha } from './resenha.entity';

@Controller('resenhas')
export class ResenhaController {
  constructor(
    private readonly resenhaService: ResenhaService,
    private eventEmitter: EventEmitter2,
    ) {}

  @Post(':receiverId')
  async create(@Param('receiverId', ParseIntPipe) receiverId:number, @Body() createResenhaDto: CreateResenhaDto, @Req() request: Request) {
    const senderId = request['user'].id;
    createResenhaDto.receiver = receiverId;
    createResenhaDto.sender = senderId;
    const resenha = await this.resenhaService.create(createResenhaDto);
    const receiverResenhasListenerId = `resenhas.${receiverId}`;
    this.eventEmitter.emit(receiverResenhasListenerId, resenha);
    return resenha;
  }

  @Get(':receiverId')
  findAll(@Param('receiverId', ParseIntPipe) receiverId:number, @Req() request: Request) {
    const senderId = request['user'].id;
    console.log(senderId, receiverId);
    return this.resenhaService.findAll(senderId, receiverId);
  }

  @Sse('sse/notifications')
  notifications(@Req() request: Request) {
    const subject = new Subject();
    const userId = request['user'].id;
    const userResenhasListenerId = `resenhas.${userId}`;
    this.eventEmitter.on(userResenhasListenerId, (resenha: Resenha) => {
      subject.next(resenha);
    });
    return subject.pipe(map((resenha) => ({ data: resenha })));
  }
}