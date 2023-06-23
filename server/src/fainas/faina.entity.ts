import { PrimaryKey, Property, Entity, OneToMany, Collection, DateTimeType, ManyToOne } from '@mikro-orm/core';
import { Comment } from '../comments/comment.entity';
import { User } from '../user/user.entity';

@Entity()
export class Faina {
    @PrimaryKey()
    id: number;

    @Property({ type: DateTimeType })
    createdAt = new Date();

    @Property()
    title: string;

    @Property()
    description: string;

    @Property()
    category: string;

    @Property({ type: DateTimeType })
    deadline: Date;

    @OneToMany(() => Comment, (comment) => comment.faina)
    comments = new Collection<Comment>(this);

    @ManyToOne(() => User, { onDelete: 'cascade' })
    user: User;
}
