import { Factory, Faker } from '@mikro-orm/seeder';
import { Faina } from './faina.entity';

export class FainaFactory extends Factory<Faina> {
  model = Faina;

  definition(faker: Faker): Partial<Faina> {
    return {
      title: faker.lorem.words(4),
      description: faker.lorem.words(12),
      category: faker.lorem.words(8),
      createdAt: faker.date.recent(),
      deadline: faker.date.future(5)
    };
  }
}