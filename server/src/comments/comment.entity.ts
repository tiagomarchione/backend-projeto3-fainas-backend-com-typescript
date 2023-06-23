import { PrimaryKey, Property, Entity, DateTimeType, ManyToOne } from '@mikro-orm/core';
import { Faina } from '../fainas/faina.entity';
import { User } from '../user/user.entity';

@Entity()
export class Comment {
    @PrimaryKey()
    commentId: number;

    @Property({ type: DateTimeType })
    commentCreatedAt = new Date();

    @Property()
    message: string;

    @ManyToOne(() => Faina, { onDelete: 'cascade' })
    faina: Faina;

    @ManyToOne(() => User, { onDelete: 'cascade' })
    user: User;
}
