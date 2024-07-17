<?php

namespace App\Controller;

use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Service\SessionService;
use App\Repository\UserRepository;

class ViewController extends AbstractController
{

	private UserService $userService;
    private SessionService $sessionService;
    private UserRepository $userRepository;

	public function __construct(UserService $userService, SessionService $sessionService, UserRepository $userRepository)
	{
		$this->userService = $userService;
        $this->sessionService = $sessionService;
        $this->userRepository = $userRepository;
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
        $this->sessionService->startSession('auth');
		if ($_SESSION !== [])
		{
			return $this->redirectToRoute('show_menu');
		}
		return $this->render('signup_user_form.html.twig');
	}

	public function signInUserForm(): Response
	{
        $this->sessionService->startSession('auth');
		if ($_SESSION !== [])
		{
			return $this->redirectToRoute('show_menu');
		}
		return $this->render('signin_user_form.html.twig');
	}

	public function showMenu(): Response
	{
        $this->sessionService->startSession('auth');
		if ($_SESSION === [])
		{
			return $this->redirectToRoute('index');
		}
		return $this->render('menu.html.twig');
	}

	public function showFirstLevel(): Response
	{
        $this->sessionService->startSession('auth');
		if ($_SESSION === [])
        {
			return $this->redirectToRoute('index');
		}
		return $this->render('first_level.html.twig');
	}

	public function showSecondLevel(): Response
	{
        $this->sessionService->startSession('auth');
		if ($_SESSION === [])
        {
			return $this->redirectToRoute('index');
		}
		return $this->render('second_level.html.twig');
	}

	public function showThirdLevel(): Response
	{
        $this->sessionService->startSession('auth');
		if ($_SESSION === [])
        {
			return $this->redirectToRoute('index');
		}
		return $this->render('third_level.html.twig');
	}

	public function showLegend(): Response
	{
        $this->sessionService->startSession('auth');
		if ($_SESSION === [])
        {
			return $this->redirectToRoute('signin_form');
		}
		return $this->render('legend.html.twig');
	}

	public function showLevels(): Response
	{
        $this->sessionService->startSession('auth');
		if ($_SESSION === []) {
			return $this->redirectToRoute('index');
		}

		$_SESSION['level'] = $this->userRepository->getUserCurrentLevel($_SESSION['username']);

		return $this->render('choose_level.html.twig', ['level' => $_SESSION['level']]);
	}

	public function showRating(): Response
	{
        $this->sessionService->startSession('auth');
		if ($_SESSION === [])
        {
			return $this->redirectToRoute('index');
		}

		$users = $this->userService->getSortedUsers();

		return $this->render('rating.html.twig', ['users' => $users]);
	}

	public function showLobby(): Response
	{
        $this->sessionService->startSession('auth');
		if ($_SESSION === [])
        {
			return $this->redirectToRoute('index');
		}
		return $this->render('lobby.html.twig');
	}

	public function showWin(): Response
	{
        $this->sessionService->startSession('auth');
		if ($_SESSION === [])
        {
			return $this->redirectToRoute('index');
		}
		return $this->render('game_win.html.twig');
	}

	public function showLose(): Response
	{
        $this->sessionService->startSession('auth');
		if ($_SESSION === [])
        {
			return $this->redirectToRoute('index');
		}
		return $this->render('game_lose.html.twig');
	}
}