<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\User;
use App\Repository\UserRepository;

class ApiController extends AbstractController
{
	private UserRepository $repository;
	public function __construct(UserRepository $repository)
	{
		$this->repository = $repository;
	}
	public function saveScore(Request $request): Response
	{
		session_name('auth');
		session_start();

		$data = json_decode($request->getContent(), true);

		$this->repository->updateUserScore($_SESSION['user_id'], $data['score'], $data['currentLvl'], $data['nextLvl']);

		return new Response('Score updated successfully for user id ' . $_SESSION['user_id']);
	}
}