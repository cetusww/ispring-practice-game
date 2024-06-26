<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class UserController extends AbstractController
{
	private UserRepository $repository;

	public function __construct(UserRepository $repository)
	{
		$this->repository = $repository;
	}

	public function index(): Response
	{
		return $this->render('signup-user-form.html.twig');
	}

	public function signUpUser(Request $request, SessionInterface $session): Response
	{
		$newPassword = $request->get('password');
		$newUsername = $request->get('username');

		if (strlen($newUsername) < 3) {
			$session->getFlashBag()->add('error', 'Имя слишком короткое. Оно должен содержать не менее 3 символов.');
			return $this->redirectToRoute('signup-form');
		}

		if (strlen($newPassword) < 6) {
			$session->getFlashBag()->add('error', 'Пароль слишком короткий. Он должен содержать не менее 6 символов.');
			return $this->redirectToRoute('signup-form');
		}

		if (!preg_match('/^[a-zA-Z]+$/', $newPassword)) {
			$session->getFlashBag()->add('error', 'Пароль должен содержать только латинские буквы.');
			return $this->redirectToRoute('signup-form');
		}

		$hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
		$user = new User(
			null,
			$newUsername,
			$hashedPassword,
		);

		$this->repository->saveUserToDatabase($user);

		return $this->redirectToRoute('show_menu');
	}

	public function signInUser(Request $request): Response
	{
		$username = $request->get('username');
		$password = $request->get('password');
		$user = $this->repository->findUserByUserName($username);
		if ($this->repository->checkPassword($user->getId(), $password)) {
			session_name('auth');
			session_start();
			$_SESSION['user_id'] = $user->getId();
			$_SESSION['username'] = $username;
			return $this->redirectToRoute(
				'show_menu',
				(array)Response::HTTP_SEE_OTHER
			);
		}	else {
			return $this->redirectToRoute(
				'signin-form',
				(array)Response::HTTP_SEE_OTHER
			);
		}
	}

	public function signOutUser(): Response
	{
		session_name('auth');
		session_start();
		session_destroy();
		return $this->redirectToRoute('index');
	}
}