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
		return $this->render('signup-user-form.html.twig');
	}

	public function signUpUser(Request $request): Response
	{
		$hashedPassword = password_hash($request->get('password'), PASSWORD_DEFAULT);
		$user = new User(
			null,
			$request->get('username'),
			$hashedPassword,
		);

		$this->repository->saveUserToDatabase($user);

		return $this->redirectToRoute(
			'show_menu',
			(array)Response::HTTP_SEE_OTHER
		);
	}

	public function signInUser(Request $request): Response
	{
		$username = $request->get('username');
		echo 1 . $username;
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