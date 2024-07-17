<?php

namespace App\Service;

use App\Entity\User;
use App\Repository\UserRepository;

class UserService
{
	private UserRepository $userRepository;
	private ValidationService $validationService;
    private SecurityService $securityService;
	public function __construct(UserRepository $userRepository, ValidationService $validationService, SecurityService $securityService)
	{
		$this->userRepository = $userRepository;
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

    public function getSortedUsers(): array
    {
        $users = $this->userRepository->findAllUsers();

        usort($users, function($a, $b)
        {
            return $b->getScoreFirstLevel() - $a->getScoreFirstLevel();
        });

        return $users;
    }

    public function setUserScore(User $user, int $currentLevel, int $newScore): void
    {
        if ($currentLevel === 1 && $user->getScoreFirstLevel() < $newScore)
        {
            $user->setScoreFirstLevel($newScore);
        }
        if ($currentLevel === 2 && $user->getScoreSecondLevel() < $newScore)
        {
            $user->setScoreSecondLevel($newScore);
        }
        if ($currentLevel === 3 && $user->getScoreThirdLevel() < $newScore)
        {
            $user->setScoreThirdLevel($newScore);
        }
    }

    public function setUserLevel(User $user, int $nextLevel): void
    {
        if ($user->getLevel() < $nextLevel)
        {
            $user->setLevel($nextLevel);
        }
    }
}