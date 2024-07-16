<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Lobby;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class LobbyController extends AbstractController
{
	public function index(EntityManagerInterface $em): Response
	{
		$lobbies = $em->getRepository(Lobby::class)->findAll();
		return $this->render('lobby.html.twig', ['lobbies' => $lobbies]);
	}
	public function create(EntityManagerInterface $em): Response
	{
		session_name('auth');
		session_start();
		$hostUsername = $_SESSION['username'] ?? null;
		if (!$hostUsername) {
			return $this->redirectToRoute('lobby');
		}

		$lobby = new Lobby(
			null,
			$hostUsername,
			null,
		);
		$em->persist($lobby);
		$em->flush();

		return $this->redirectToRoute('lobby');
	}

	public function join(EntityManagerInterface $em, $id): Response
	{
		session_name('auth');
		session_start();
		$connectedUsername = $_SESSION['username'] ?? null;
		if (!$connectedUsername) {
			return $this->redirectToRoute('lobby');
		}

		$lobby = $em->getRepository(Lobby::class)->find($id);
		if ($lobby && !$lobby->getConnectedUsername()) {
			$lobby->setConnectedUsername($connectedUsername);
			$em->persist($lobby);
			$em->flush();
		}

		return $this->redirectToRoute('game', ['id' => $id]);
	}
}