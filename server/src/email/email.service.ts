import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import * as formData from 'form-data';
import Mailgun from 'mailgun.js';
import { Email } from './email.entity';
import { EntityRepository } from '@mikro-orm/mysql';
import { User } from '../user/user.entity';


@Injectable()
export class EmailService {
    constructor(
        @InjectRepository(Email)
        private readonly emailRepository: EntityRepository<Email>,
    ) {
        this.mailgun = new Mailgun(formData);
        this.mailgunClient = this.mailgun.client({
            username: 'apithis.',
            key: process.env.MAILGUN_API_KEY,
        });
    }

    private readonly mailgun : Mailgun;
    private readonly mailgunClient : ReturnType<Mailgun['client']>

    async sendEmail({
        to,
        subject,
        text
    } : {
        to: string,
        subject: string,
        text: string
    }) {
        try {
            const response = await this.mailgunClient.messages.create(
                'sandbox-123.mailgun.org',
                {
                    from: 'Sysfainas <mailgun@sandbox-123.mailgun.org>',
                    to: [to],
                    subject,
                    text,
                },
            );
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }   
    }

    async create(user: User, code: string) {
        const email = new Email();
        email.user = user;
        email.code = code;
        await this.emailRepository.persistAndFlush(email);
        return email;
    }

    findByUserIdAndCode(userId: number, code: string) {
        return this.emailRepository.findOne({
            code,
            user: userId,
        });
    }
}
