import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FainasModule } from './fainas/fainas.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ResenhaModule } from './resenha/resenha.module';
import * as path from 'path';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    FainasModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
    }),
    ResenhaModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
