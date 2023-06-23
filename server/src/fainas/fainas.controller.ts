import { Controller, Get, Post, Body, Put, Param, Delete, Req, Request, Query, ParseIntPipe } from '@nestjs/common';
import { FainasService } from './fainas.service';
import { CreateFainaDto } from './dto/create-faina.dto';
import { UpdateFainaDto } from './dto/update-faina.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { Public } from '../auth/decorators/public-endpoint';

@Controller('todolist')
export class FainasController {
  constructor(private readonly fainasService: FainasService) {}

  @Post()
  create(@Body() createFainaDto: CreateFainaDto, @Req() req: Request) {
    const userId = req['user'].id;
    createFainaDto.user = userId;
    return this.fainasService.create(createFainaDto);
  }

  @Public()
  @Get()
  findAll(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
    @Query('orderBy') orderBy: string,
    @Query('direction') direction: string,
    @Query('search') search: string,
  ) {
    return this.fainasService.findAll({
      limit: limit ? +limit : undefined,
      offset: offset ? +offset : undefined,
      orderBy,
      direction,
      search,
    });
  }

  @Public()
  @Get(':id')
  findOne(@Req() req: Request, @Param('id') id: string) {
    return this.fainasService.findOne(+id);
  }

  @Post(':id/comments')
  addComment(
    @Param('id', ParseIntPipe) commentId: number,
    @Body() addCommentDto: AddCommentDto,
  ) {
    return this.fainasService.addComment(+commentId, addCommentDto);
  }

  @Get('comments/:id')
  findComments(@Param('id', ParseIntPipe) id: string) {
    return this.fainasService.findComments(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateFainaDto: UpdateFainaDto,
    @Req() req: Request
  ) {
    const userId: number = req['user'].id;
    return this.fainasService.update(+id, userId, updateFainaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const userId = req['user'].id;
    return this.fainasService.remove(+id, userId);
  }

  @Get('user/myself')
  userFainas (@Req() request: Request) {
    const userId : number = request['user'].id;
    return this.fainasService.getUserFainas(userId);
  }
}
