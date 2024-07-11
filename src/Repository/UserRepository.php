<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;

class UserRepository
{

	private EntityManagerInterface $entityManager;
	private EntityRepository $repository;
	public function __construct(EntityManagerInterface $entityManager)
	{
		$this->entityManager = $entityManager;
		$this->repository = $entityManager->getRepository(User::class);
	}

	public function saveUserToDatabase(User $user): int
	{
		$this->entityManager->persist($user);
		$this->entityManager->flush();
		return $user->getId();
	}

	public function findUserByUserName(string $username): ?User
	{
		return $this->repository->findOneBy(['username' => $username]);
	}

	public function findAllUsers(): array
	{
		return $this->repository->findAll();
	}

	public function getCurrentUser(): ?User
	{
		session_name('auth');
		session_start();
		return $this->repository->findOneBy(['id' => $_SESSION['user_id']]);
	}

	public function checkPassword(int $userId, string $password): bool
	{
		$user = $this->repository->findOneBy(['id' => $userId]);
		if (password_verify($password, $user->getPassword())) {
			return true;
		}
		return false;
	}

	public function updateUserScore(int $userId, int $newScore, int $currentLevel): void
	{
		$user = $this->entityManager->getRepository(User::class)->find($userId);

		if ($currentLevel === 1)
		{
			if ($user->getScoreFirstLevel() < $newScore)
			{
				$user->setScoreFirstLevel($newScore);
			}
		}
		if ($currentLevel === 2)
		{
			if ($user->getScoreSecondLevel() < $newScore)
			{
				$user->setScoreSecondLevel($newScore);
			}
		}
		if ($currentLevel === 3)
		{
			if ($user->getScoreThirdLevel() < $newScore)
			{
				$user->setScoreThirdLevel($newScore);
			}
		}
		
		$this->entityManager->flush();
	}
}