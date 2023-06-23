import { Migration } from '@mikro-orm/migrations';

export class Migration20230604185558 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `faina` modify `created_at` datetime not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `faina` modify `created_at` varchar(255) not null;');
  }

}
