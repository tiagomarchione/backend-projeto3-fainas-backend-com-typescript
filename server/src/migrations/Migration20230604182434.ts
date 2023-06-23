import { Migration } from '@mikro-orm/migrations';

export class Migration20230604182434 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `comment` (`comment_id` int unsigned not null auto_increment primary key, `comment_created_at` datetime not null, `message` varchar(255) not null, `faina_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `comment` add index `comment_faina_id_index`(`faina_id`);');

    this.addSql('alter table `comment` add constraint `comment_faina_id_foreign` foreign key (`faina_id`) references `faina` (`id`) on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `comment`;');
  }

}
