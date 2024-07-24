<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;

class UserScoreService
{
    private static ?EntityManagerInterface $entityManager = null;

    public static function setEntityManager(EntityManagerInterface $entityManager): void
    {
        self::$entityManager = $entityManager;
    }

    public static function addUserScore(string $username, int $score): void
    {
        if (self::$entityManager === null) {
            throw new \LogicException('EntityManager not set.');
        }

        $user = self::$entityManager->getRepository(User::class)->findOneBy(['username' => $username]);
        if ($user) {
            $user->setScoreThirdLevel($user->getScoreThirdLevel() + $score);
            self::$entityManager->flush();
            echo "Updated user {$username} score to {$user->getScoreThirdLevel()}\n";
        }
    }
}
