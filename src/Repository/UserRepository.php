<?php

namespace App\Repository;

use App\Entity\User;
use App\Service\SessionService;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use App\Service\SecurityService;

class UserRepository
{

	private EntityManagerInterface $entityManager;
	private EntityRepository $repository;
	private SecurityService $securityService;
	public function __construct(EntityManagerInterface $entityManager, SecurityService $securityService)
	{
		$this->entityManager = $entityManager;
		$this->repository = $entityManager->getRepository(User::class);
		$this->securityService = $securityService;
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

	public function getCurrentUser(): ?User
	{
		session_name('auth');
		session_start();
		return $this->repository->findOneBy(['id' => $_SESSION['user_id']]);
	}
}