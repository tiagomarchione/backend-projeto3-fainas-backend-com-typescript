import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs'
import { CreateFainaDto } from './dto/create-faina.dto';
import { UpdateFainaDto } from './dto/update-faina.dto';
import { Faina } from './faina.entity';
import { EntityRepository } from '@mikro-orm/mysql';
import { wrap } from '@mikro-orm/core';
import { AddCommentDto } from './dto/add-comment.dto';
import { Comment } from '../comments/comment.entity';
import { User } from '../user/user.entity';

@Injectable()
export class FainasService {
  constructor(
    @InjectRepository(Faina)
    private readonly fainaRepository: EntityRepository<Faina>,
    @InjectRepository(Comment)
    private readonly commentRepository: EntityRepository<Comment>,
    ) {}

  async create(createFainaDto: CreateFainaDto) {
    const faina = this.fainaRepository.create(createFainaDto);
    await this.fainaRepository.flush();
    return faina;
  }

  async findAll({
    limit = 10, 
    offset = 0, 
    orderBy = 'deadline', 
    direction = 'asc', 
    search = undefined as string | undefined,
  } = {}) {
    const [todolist, count] = await this.fainaRepository.findAndCount(
      search && {
        $or: [
          {
            title: {
              $like: `%${search}%`
            },
          },
          {
            description: {
              $like: `%${search}%`
            },
          },
          {
            category: {
              $like: `%${search}%`
            },
          },
        ],        
      },
      {
        populate: ['user'],
        fields: [
          '*',
          'user.id',
          'user.name',
          'user.surname',
          'user.userPicture',
        ],
        limit,
        offset,
        orderBy: {
          [orderBy]: direction,
        }
      });

    return {
      todolist,
      count,
    };
  }

  findOne(id: number) {
    return this.fainaRepository.findOneOrFail(id);
  }

  async findComments(id: number) {
    const faina = await this.fainaRepository.findOneOrFail(id);
    await faina.comments.init();
    const comments = await faina.comments.getItems();
    return comments;
  }

  async addComment(fainaId: number, addCommentDto: AddCommentDto) {
    const faina = await this.fainaRepository.findOneOrFail(fainaId);
    const comment = new Comment();
    comment.faina = faina;
    wrap(comment).assign(addCommentDto);
    await this.commentRepository.persistAndFlush(comment);
    return comment;
  }

  async update(id: number, userId: number, updateFainaDto: UpdateFainaDto) {
    const faina = await this.fainaRepository.findOneOrFail(id, {
      populate: ['user'],
      fields: [
        '*',
        'user.id',
        'user.name',
        'user.surname',
        'user.userPicture'
      ],
    });
    if(faina.user.id !== userId) {
      throw new ForbiddenException();
    }
    wrap(faina).assign(updateFainaDto);
    this.fainaRepository.flush();
    return faina;
  }

  async remove(id: number, userId: number) {
    const faina = await this.fainaRepository.findOneOrFail(id, {
      populate: ['user'],
      fields: [
        '*',
        'user.id',
      ],
    });
    if(faina.user.id !== userId) {
      throw new ForbiddenException();
    }
    this.fainaRepository.remove(faina);
    await this.fainaRepository.flush();
    return faina;
  }

  async getUserFainas(user: number) {
    const userFainas = await this.fainaRepository.find({
      user
    });
    return userFainas;
  }
}
