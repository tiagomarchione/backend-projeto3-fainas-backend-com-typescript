import { Migration } from '@mikro-orm/migrations';

export class Migration20230603031919 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `faina` (`id` int unsigned not null auto_increment primary key, `created_at` varchar(255) not null, `title` varchar(255) not null, `description` varchar(255) not null, `category` varchar(255) not null, `deadline` datetime not null) default character set utf8mb4 engine = InnoDB;');
  }

}
