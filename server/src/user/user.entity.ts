import { Entity, Property, PrimaryKey, Unique, DateTimeType, OneToMany, Collection, BeforeCreate, BooleanType } from "@mikro-orm/core";
import * as bcrypt from "bcrypt";
import { Faina } from "../fainas/faina.entity";
import { Comment } from "../comments/comment.entity";
import { Email } from "../email/email.entity";
import { Resenha } from "../resenha/resenha.entity";

@Entity()
export class User {
    @PrimaryKey()
    id: number;

    @Unique()
    @Property()
    email: string;

    @Property({ nullable: true, columnType: 'varchar(5000)' })
    userPicture?: string;

    @Property({ type: BooleanType })
    isEmailVerified = false;

    @Property()
    name: string;

    @Property()
    surname: string;

    @Property()
    password: string;

    @Property({ type: DateTimeType })
    createdAt = new Date();

    @OneToMany(() => Faina, (faina) => faina.user)
    fainas = new Collection<Faina>(this);

    @OneToMany(() => Comment, (comment) => comment.user)
    comments = new Collection<Comment>(this);
    
    @OneToMany(() => Resenha, (resenha) => resenha.sender)
    sentResenhas = new Collection<Resenha>(this);

    @OneToMany(() => Resenha, (resenha) => resenha.receiver)
    receivedResenhas = new Collection<Resenha>(this);

    @OneToMany(() => Email, (email) => email.user)
    emailVerifications = new Collection<Email>(this);

    async comparePassword(password : string) {
        const passwordEquals = await bcrypt.compare(password, this.password);
        return passwordEquals;
    }

    @BeforeCreate()
    async hashPassword() {
        const rounds = 10;
        this.password = await bcrypt.hash(this.password, rounds);
    }
}