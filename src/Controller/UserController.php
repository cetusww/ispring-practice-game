<?php

namespace App\Controller;

use App\Service\SessionService;
use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use App\Service\ValidationService;


class UserController extends AbstractController
{
	private UserService $userService;
	private SessionService $sessionService;

	public function __construct(UserService $userService, SessionService $sessionService)
	{
		$this->userService = $userService;
		$this->sessionService = $sessionService;
	}

	public function index(): Response
	{
		return $this->render('signup-user-form.html.twig');
	}

	public function signUpUser(Request $request, SessionInterface $session): Response
	{
		$newPassword = $request->get('password');
		$newUsername = $request->get('username');

		$result = $this->userService->signUpUser($newUsername, $newPassword);

		if (isset($result['error']))
		{
			return $this->render('signup-user-form.html.twig', ['error' => $result['error']]);
		}

		return $this->redirectToRoute('show_menu');
	}

	public function signInUser(Request $request): Response
	{
		$username = $request->get('username');
		$password = $request->get('password');

		$errors = [];

		if (empty($username))
		{
			$errors['username'] = 'Имя пользователя не может быть пустым.';
		}
		if (empty($password))
		{
			$errors['password'] = 'Пароль не может быть пустым.';
		}

		$user = $this->repository->findUserByUserName($username);

		if (!$user)
		{
			$errors['username'] = 'Пользователя с таким именем не существует';
		}
		if ($user && !$this->repository->checkPassword($user->getId(), $password))
		{
			$errors['password'] = 'Неверный пароль';
		}
		if (!empty($errors))
		{
			return $this->render('signin-user-form.html.twig', ['errors' => $errors]);
		}

		session_name('auth');
		session_start();
		$_SESSION['user_id'] = $user->getId();
		$_SESSION['username'] = $username;
		return $this->redirectToRoute('show_menu');
	}

	public function signOutUser(): Response
	{
		session_name('auth');
		session_start();
		session_destroy();
		return $this->redirectToRoute('index');
	}
}