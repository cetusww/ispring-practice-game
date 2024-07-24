<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Service\SessionService;
use App\Service\UserService;

class ViewController extends AbstractController
{

    private UserRepository $userRepository;
    private SessionService $sessionService;
    private UserService $userService;

    public function __construct(SessionService $sessionService, UserRepository $userRepository, UserService $userService)
    {
        $this->sessionService = $sessionService;
        $this->userRepository = $userRepository;
        $this->userService = $userService;
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

        $currentLevel = $this->userRepository->getUserCurrentLevel($_SESSION['username']);
        if ($currentLevel >= 2)
        {
            return $this->render('second_level.html.twig');
        }

        return $this->redirectToRoute('choose_level');
    }

    public function showThirdLevel(): Response
    {
        $this->sessionService->startSession('auth');
        if ($_SESSION === [])
        {
            return $this->redirectToRoute('index');
        }

        $currentLevel = $this->userRepository->getUserCurrentLevel($_SESSION['username']);
        if ($currentLevel >= 3)
        {
            return $this->render('third_level.html.twig');
        }

        return $this->redirectToRoute('choose_level');
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

        $user = $this->userRepository->findUserByUserName($_SESSION['username']);

        $_SESSION['level'] = $this->userRepository->getUserCurrentLevel($_SESSION['username']);

        return $this->render('choose_level.html.twig', ['level' => $_SESSION['level'], 'user' => $user]);
    }

    public function showRating(): Response
    {
        $this->sessionService->startSession('auth');

        if ($_SESSION === [])
        {
            return $this->redirectToRoute('index');
        }

        $sortedUsers = $this->userService->getSortedUsers();

        return $this->render('rating.html.twig', ['usersMultiplayer' => $sortedUsers['multiplayer'], 'usersFirstLevel' => $sortedUsers['first'], 'usersSecondLevel' => $sortedUsers['second'], 'usersThirdLevel' => $sortedUsers['third']]);
    }

    public function showMultiplayer(): Response
    {
        $this->sessionService->startSession('auth');
        $username = $_SESSION['username'] ?? null;
        if ($username === null)
        {
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

        return $this->render('game_win.html.twig', ['score' => $_SESSION['score'], 'time' => $_SESSION['time']]);
    }

    public function showLose(): Response
    {
        $this->sessionService->startSession('auth');
        if ($_SESSION === [])
        {
            return $this->redirectToRoute('index');
        }

        $user = $this->userRepository->findUserByUserName($_SESSION['username']);

        return $this->render('game_lose.html.twig');
    }
}