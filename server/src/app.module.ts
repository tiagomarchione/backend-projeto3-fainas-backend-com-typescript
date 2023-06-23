import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FainasModule } from './fainas/fainas.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
