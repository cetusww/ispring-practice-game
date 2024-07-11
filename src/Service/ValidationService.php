<?php

namespace App\Service;

use App\Entity\User;
use App\Repository\UserRepository;

class ValidationService
{
	private UserRepository $userRepository;

	public function __construct(UserRepository $userRepository)
	{
		$this->userRepository = $userRepository;
	}
	public function validateSignUpData(string $username, string $password, ?User $existingUser): array
	{
		$errors = [];

		if (empty($username))
		{
			$errors['username'] = 'Имя пользователя не может быть пустым.';
		}
		if (empty($password))
		{
			$errors['password'] = 'Пароль не может быть пустым.';
		}
		if (strlen($password) < 6)
		{
			$errors['password'] = 'Пароль должен содержать не менее 6 символов.';
		}

		if ($existingUser)
		{
			$errors['username'] = 'Пользователь с таким именем уже существует.';
		}

		return $errors;
	}
}