<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Service\SessionService;

class ViewController extends AbstractController
{

	private UserRepository $userRepository;
	private SessionService $sessionService;

	public function __construct(SessionService $sessionService, UserRepository $userRepository)
	{
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

	public function showNextLevel(): Response
	{
        $this->sessionService->startSession('auth');
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
        if ($_SESSION === [])
        {
            return $this->redirectToRoute('index');
        }

        $_SESSION['level'] = $this->userRepository->getUserCurrentLevel($_SESSION['username']);

        return $this->render('choose_level.html.twig', ['level' => $_SESSION['level']]);
    }

	public function showRating(): Response
	{
		session_name('auth');
		session_start();

		if ($_SESSION === []) {
			return $this->redirectToRoute('index');
		}

        $usersMultiplayer = $this->repository->findAllUsers();
		$usersFirstLevel = $this->repository->findAllUsers();
        $usersSecondLevel = $this->repository->findAllUsers();
        $usersThirdLevel = $this->repository->findAllUsers();

        usort($usersMultiplayer, function($a, $b) {

            $aAll = $a->getMultiplayerAll();
            $aWin = $a->getMultiplayerWin();

            $bAll = $b->getMultiplayerAll();
            $bWin = $b->getMultiplayerWin();

            $aRatio = $aAll > 0 ? $aWin / $aAll : 0;
            $bRatio = $bAll > 0 ? $bWin / $bAll : 0;

            return $bRatio <=> $aRatio;
        });

		usort($usersFirstLevel, function($a, $b) {
			return $b->getScoreFirstLevel() - $a->getScoreFirstLevel();
		});
        usort($usersSecondLevel, function($a, $b) {
            return $b->getScoreSecondLevel() - $a->getScoreSecondLevel();
        });
        usort($usersThirdLevel, function($a, $b) {
            return $b->getScoreThirdLevel() - $a->getScoreThirdLevel();
        });

		return $this->render('rating.html.twig', ['usersMultiplayer' => $usersMultiplayer, 'usersFirstLevel' => $usersFirstLevel, 'usersSecondLevel' => $usersSecondLevel, 'usersThirdLevel' => $usersThirdLevel]);
	}

	public function showMultiplayer(): Response
	{
		session_name('auth');
		session_start();
		$username = $_SESSION['username'] ?? null;
		if ($username === null) {
			return $this->redirectToRoute('index');
		}
		return $this->render('lobby.html.twig', ['username' => $username]);
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