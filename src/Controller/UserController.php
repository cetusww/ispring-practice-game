<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\User;
use App\Repository\UserRepository;

class UserController extends AbstractController
{
	private UserRepository $repository;

	public function __construct(UserRepository $repository)
	{
		$this->repository = $repository;
	}

	public function index(): Response
	{
		return $this->render('signup_user_form.html.twig');
	}

	public function signUpUser(Request $request): Response
	{
		$newPassword = $request->get('password');
		$newUsername = $request->get('username');
        $user = $this->repository->findUserByUserName($newUsername);

		$errors = [];

		if (empty($newUsername))
		{
			$errors['username'] = 'Имя пользователя не может быть пустым.';
		}
		if (empty($newPassword))
		{
			$errors['password'] = 'Пароль не может быть пустым.';
		}
		if (strlen($newPassword) < 6)
		{
			$errors['password'] = 'Пароль должен содержать не менее 6 символов.';
		}
		if ($user)
		{
			$errors['username'] = 'Пользователь с таким именем уже существует.';
		}

		if (!empty($errors))
		{
			return $this->render('signup_user_form.html.twig', ['errors' => $errors]);
		}

		$hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
		$user = new User(
			null,
			$newUsername,
			$hashedPassword,
			1,
			0,
			0,
			0,
            0,
            0,
            0,
		);

		$this->repository->saveUserToDatabase($user);

		session_name('auth');
		session_start();
		$_SESSION['user_id'] = $user->getId();
		$_SESSION['username'] = $newUsername;
		$_SESSION['level'] = $user->getLevel();

		return $this->redirectToRoute('show_legend');
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
			return $this->render('signin_user_form.html.twig', ['errors' => $errors]);
		}

		session_name('auth');
		session_start();
		$_SESSION['user_id'] = $user->getId();
		$_SESSION['username'] = $username;
		$_SESSION['level'] = $user->getLevel();
		return $this->redirectToRoute('show_legend');
	}

	public function signOutUser(): Response
	{
		session_name('auth');
		session_start();
		session_destroy();
		return $this->redirectToRoute('index');
	}
}