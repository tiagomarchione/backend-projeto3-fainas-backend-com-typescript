import { Controller, Get, Param, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
constructor(private readonly userService : UserService) {}

    @Get('myself')
    async user(@Req() request : Request) {
        const payload = request['user'];
        const { password, ...user } = await this.userService.getMyself(payload.id);
        return user;
    }

    @Get(':id')
    async findOne( @Param('id') id: number) {
        const { password, ...user } = await this.userService.findById(id);
        return user;    
    }

    @Post('upload-picture')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() picture: Express.Multer.File, @Req() req: Request) {
        const userId = req['user'].id;
        return this.userService.uploadPicture(userId, picture.buffer);
    }
}
