<?php

namespace App\Repository;

use App\Entity\Lobby;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;

class LobbyRepository
{

	private EntityManagerInterface $entityManager;
	private EntityRepository $repository;
	public function __construct(EntityManagerInterface $entityManager)
	{
		$this->entityManager = $entityManager;
		$this->repository = $entityManager->getRepository(Lobby::class);
	}

	public function saveLobbyToDatabase(Lobby $lobby): int
	{
		$this->entityManager->persist($lobby);
		$this->entityManager->flush();
		return $lobby->getId();
	}

	public function findLobbyByHostUserName(string $username): ?Lobby
	{
		return $this->repository->findOneBy(['hostUsername' => $username]);
	}
	public function findLobbyById(int $id): ?Lobby
	{
		return $this->repository->findOneBy(['id' => (string)$id]);
	}

	public function findAllLobby(): array
	{
		return $this->repository->findAll();
	}
}