import * as dotenv from 'dotenv';
dotenv.config();
import { Comment } from './comments/comment.entity';
import { Faina } from './fainas/faina.entity';
import { User } from './user/user.entity';
import { Email } from './email/email.entity';
import { Resenha } from './resenha/resenha.entity';

export default {
  entities: [Faina, Comment, User, Email, Resenha],
  port: process.env.MYSQL_PORT,
  dbName: process.env.MYSQL_DB,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  type: 'mysql'
};