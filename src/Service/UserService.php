<?php

namespace App\Service;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\SecurityService;
use App\Service\ValidationService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class UserService
{
	private UserRepository $userRepository;
	private ValidationService $validationService;
  private SecurityService $securityService;
	public function __construct(UserRepository $repository, ValidationService $validationService, SecurityService $securityService)
	{
		$this->userRepository = $repository;
		$this->validationService = $validationService;
		$this->securityService = $securityService;
	}

	public function signUpUser(string $username, string $password): array
	{
		$existingUser = $this->userRepository->findUserByUserName($username);
		$error = $this->validationService->validateSignUpData($username, $password, $existingUser);

		if (!empty($error))
		{
			return ['error' => $error];
		}

		$hashedPassword = $this->securityService->hashPassword($password);
		$user = new User(
			null,
			$username,
			$hashedPassword,
			1,
			0,
			0,
			0,
		);

		$this->userRepository->saveUserToDatabase($user);

		return ['user' => $user];
	}

	public function signInUser(string $username, string $password): array
	{
		$existingUser = $this->userRepository->findUserByUserName($username);
		$error = $this->validationService->validateSignInData($username, $password, $existingUser);

		if (!empty($error))
		{
			return ['error' => $error];
		}

		return ['user' => $existingUser];
	}
}