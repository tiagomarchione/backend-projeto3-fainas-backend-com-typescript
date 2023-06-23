import { Migration } from '@mikro-orm/migrations';

export class Migration20230614121846 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `faina` add `user_id` int unsigned not null;');
    this.addSql('alter table `faina` add constraint `faina_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `faina` add index `faina_user_id_index`(`user_id`);');
  }

  async down(): Promise<void> {
    this.addSql('alter table `faina` drop foreign key `faina_user_id_foreign`;');

    this.addSql('alter table `faina` drop index `faina_user_id_index`;');
    this.addSql('alter table `faina` drop `user_id`;');
  }

}
