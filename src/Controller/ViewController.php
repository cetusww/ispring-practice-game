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
		return $this->render('signup-user-form.html.twig');
	}

	public function signInUserForm(): Response
	{
		return $this->render('signin-user-form.html.twig');
	}

	public function showMenu(): Response
	{
		return $this->render('menu.html.twig');
	}

}