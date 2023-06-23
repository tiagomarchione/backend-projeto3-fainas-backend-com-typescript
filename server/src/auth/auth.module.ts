import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { Email } from '../email/email.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    MikroOrmModule.forFeature([User, Email]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '20m' },
    }),
  ],
  providers: [
    AuthService,
    UserService,
    EmailService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
