<?php

namespace App\Entity;

class User
{
	public function __construct(
		private ?int $id,
		private string $username,
		private string $password,
	)
	{
	}

	public function getId(): ?int
	{
		return $this->id;
	}

	public function getUserName(): string
	{
		return $this->username;
	}

	public function getPassword(): string
	{
		return $this->password;
	}

	public function setUserName(string $username): string
	{
		return $this->username = $username;
	}

	public function setPassword(string $password): string
	{
		return $this->password = $password;
	}
}