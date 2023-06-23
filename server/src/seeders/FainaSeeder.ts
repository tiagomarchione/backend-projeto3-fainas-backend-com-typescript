import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { CommentFactory } from '../comments/comment.factory';
import { FainaFactory } from '../fainas/faina.factory';

export class FainaSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const fainas = await new FainaFactory(em)
        .each((faina) => {
            faina.comments.set(new CommentFactory(em).make(30));
        })
        .create(100);
  }
}
