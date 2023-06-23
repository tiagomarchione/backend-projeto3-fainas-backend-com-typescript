import { Comment } from './comments/comment.entity';
import { Faina } from './fainas/faina.entity';
import { User } from './user/user.entity';
import { Email } from './email/email.entity';

export default {
    entities: [Faina, Comment, User, Email],
    port: 3306,
    dbName: 'fainas-projeto3',
    host: '127.0.0.1',
    user: 'root',
    password: 'miguel',
    type: 'mysql'
  };