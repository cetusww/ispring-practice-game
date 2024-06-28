<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ViewController extends AbstractController
{

	public function index(): Response
	{
		return $this->render('screensaver.html.twig');
	}

	public function signUpUserForm(): Response
	{
		session_name('auth');
		session_start();
		if ($_SESSION !== []) {
			return $this->redirectToRoute('show_menu');
		}
		return $this->render('signup-user-form.html.twig');
	}

	public function signInUserForm(): Response
	{
		session_name('auth');
		session_start();
		if ($_SESSION !== []) {
			return $this->redirectToRoute('show_menu');
		}
		return $this->render('signin-user-form.html.twig');
	}

	public function showMenu(): Response
	{
		session_name('auth');
		session_start();
		if ($_SESSION === []) {
			return $this->redirectToRoute('index');
		}
		return $this->render('menu.html.twig');
	}

    public function showGame(): Response
    {
        return $this->render('game.html.twig');
    }

		public function showLegend(): Response
		{
			return $this->render('legend.html.twig');
		}

}