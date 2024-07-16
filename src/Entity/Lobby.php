<?php

namespace App\Entity;

class Lobby
{
	public function __construct(
		private ?int $id,
		private string $hostUsername,
		private ?string $connectedUsername,
	)
	{
	}

	public function getId(): ?int
	{
		return $this->id;
	}

	public function getHostUserName(): string
	{
		return $this->hostUsername;
	}
	public function getConnectedUserName(): ?string
	{
		return $this->connectedUsername;
	}

	public function setConnectedUserName(string $username): string
	{
		return $this->connectedUsername = $username;
	}
	public function setHostUserName(string $username): string
	{
		return $this->hostUsername = $username;
	}
}