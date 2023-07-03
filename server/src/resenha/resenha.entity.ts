import { Entity, PrimaryKey, Property, TextType, ManyToOne, DateTimeType } from "@mikro-orm/core";
import { User } from "../user/user.entity";

@Entity()
export class Resenha {
    @PrimaryKey()
    id: number;

    @Property({ type: TextType })
    content: string;

    @Property({ type: DateTimeType })
    createdAt = new Date();

    @ManyToOne(() => User, {
        onDelete: 'cascade'
    })
    sender: User;

    @ManyToOne(() => User, {
        onDelete: 'cascade'
    })
    receiver: User;

}
