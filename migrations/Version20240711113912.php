<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240711113912 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX username ON user');
        $this->addSql('ALTER TABLE user ADD level INT NOT NULL, ADD score_1 INT NOT NULL, ADD score_2 INT NOT NULL, ADD score_3 INT NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP level, DROP score_1, DROP score_2, DROP score_3');
        $this->addSql('CREATE UNIQUE INDEX username ON user (username)');
    }
}
