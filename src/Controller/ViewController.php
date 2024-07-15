<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ViewController extends AbstractController
{

	private UserRepository $repository;

	public function __construct(UserRepository $repository)
	{
		$this->repository = $repository;
	}

	public function index(): Response
	{
		return $this->render('screensaver.html.twig');
	}

	public function showNotFoundException(): Response
	{
		return $this->render('not_found_exception.html.twig');
	}

	public function signUpUserForm(): Response
	{
		session_name('auth');
		session_start();
		if ($_SESSION !== [])
		{
			return $this->redirectToRoute('show_menu');
		}
		return $this->render('signup_user_form.html.twig');
	}

	public function signInUserForm(): Response
	{
		session_name('auth');
		session_start();
		if ($_SESSION !== [])
		{
			return $this->redirectToRoute('show_menu');
		}
		return $this->render('signin_user_form.html.twig');
	}

	public function showMenu(): Response
	{
		session_name('auth');
		session_start();
		if ($_SESSION === [])
		{
			return $this->redirectToRoute('index');
		}
		return $this->render('menu.html.twig');
	}

	public function showNextLevel(): Response
	{
		session_name('auth');
		session_start();
		if ($_SESSION === [])
		{
			return $this->redirectToRoute('index');
		}

		if ($_SESSION['level'] === 2)
		{
			return $this->redirectToRoute('show_second_level');
		}

		if ($_SESSION['level'] === 3)
		{
			return $this->redirectToRoute('show_third_level');
		}

		return $this->redirectToRoute('choose_level');
	}

	public function showFirstLevel(): Response
	{
		session_name('auth');
		session_start();
		if ($_SESSION === [])
		{
			return $this->redirectToRoute('index');
		}
		return $this->render('first_level.html.twig');
	}

	public function showSecondLevel(): Response
	{
		session_name('auth');
		session_start();
		if ($_SESSION === []) {
			return $this->redirectToRoute('index');
		}
		return $this->render('second_level.html.twig');
	}

	public function showThirdLevel(): Response
	{
		session_name('auth');
		session_start();
		if ($_SESSION === []) {
			return $this->redirectToRoute('index');
		}
		return $this->render('third_level.html.twig');
	}

	public function showLegend(): Response
	{
		session_name('auth');
		session_start();
		if ($_SESSION === []) {
			return $this->redirectToRoute('signin-form');
		}
		return $this->render('legend.html.twig');
	}

	public function showLevels(): Response
	{
		session_name('auth');
		session_start();
		if ($_SESSION === []) {
			return $this->redirectToRoute('index');
		}

		$user = $this->repository->findUserByUserName($_SESSION['username']);
		$_SESSION['level'] = $user->getLevel();

		return $this->render('choose_level.html.twig', ['level' => $_SESSION['level']]);
	}

	public function showRating(): Response
	{
		session_name('auth');
		session_start();
		if ($_SESSION === []) {
			return $this->redirectToRoute('index');
		}
		$users = $this->repository->findAllUsers();

		usort($users, function($a, $b) {
			return $b->getScoreFirstLevel() - $a->getScoreFirstLevel();
		});

		return $this->render('rating.html.twig', ['users' => $users]);
	}

	public function showLobby(): Response
	{
		session_name('auth');
		session_start();
		if ($_SESSION === []) {
			return $this->redirectToRoute('index');
		}
		return $this->render('lobby.html.twig');
	}

	public function showWin(): Response
	{
		session_name('auth');
		session_start();
		if ($_SESSION === []) {
			return $this->redirectToRoute('index');
		}
		return $this->render('game_win.html.twig');
	}

	public function showLose(): Response
	{
		session_name('auth');
		session_start();
		if ($_SESSION === []) {
			return $this->redirectToRoute('index');
		}
		return $this->render('game_lose.html.twig');
	}

}