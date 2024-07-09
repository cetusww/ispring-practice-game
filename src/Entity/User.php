<?php

namespace App\Entity;

class User
{
	public function __construct(
		private ?int $id,
		private string $username,
		private string $password,
		private ?int $level,
		private string $scoreFirstLevel,
		private string $scoreSecondLevel,
		private string $scoreThirdLevel,
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

	public function getLevel(): ?int
	{
		return $this->level;
	}

	public function getScoreFirstLevel(): string
	{
		return $this->scoreFirstLevel;
	}

	public function getScoreSecondLevel(): string
	{
		return $this->scoreSecondLevel;
	}

	public function getScoreThirdLevel(): string
	{
		return $this->scoreThirdLevel;
	}

	public function setUserName(string $username): string
	{
		return $this->username = $username;
	}

	public function setPassword(string $password): string
	{
		return $this->password = $password;
	}

	public function setLevel(int $level): int
	{
		return $this->level = $level;
	}

	public function setScoreFirstLevel(string $scoreFirstLevel): int
	{
		return $this->scoreFirstLevel = $scoreFirstLevel;
	}

	public function setScoreSecondLevel(string $scoreSecondLevel): int
	{
		return $this->scoreSecondLevel = $scoreSecondLevel;
	}

	public function setScoreThirdLevel(string $scoreThirdLevel): int
	{
		return $this->scoreThirdLevel = $scoreThirdLevel;
	}
}