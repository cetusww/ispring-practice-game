<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\Lobby;
use App\Repository\LobbyRepository;

class LobbyController extends AbstractController
{
	private LobbyRepository $lobbyRepository;

	public function __construct(LobbyRepository $lobbyRepository)
	{
		$this->lobbyRepository = $lobbyRepository;
	}

	public function index(): Response
	{
		return $this->render('signup_user_form.html.twig');
	}

	public function createLobby(Request $request): Response
	{
		session_name('auth');
		session_start();
		$username = $_SESSION['username'] ?? null;
		if ($username === null) {
			return $this->redirectToRoute('index');
		}
		$lobby = $this->lobbyRepository->findLobbyByHostUserName($username);
		if ($lobby === null)
		{
			$lobby = new Lobby(
				null,
				$username,
				null,
			);
			$lobbyId = $this->lobbyRepository->saveLobbyToDatabase($lobby);
		}
		$lobbyId = $lobby->getId();
		return $this->redirectToRoute('show_lobby', ["id" => $lobbyId]);
	}
	public function connectLobby(Request $request): Response
	{
		session_name('auth');
		session_start();
		$username = $_SESSION['username'] ?? null;
		if ($username === null) {
			return $this->redirectToRoute('index');
		}
		$lobbyId = (int)$request->get('id');
		$lobby = $this->lobbyRepository->findLobbyById($lobbyId);
		if ($lobby === null)
		{
			return $this->redirectToRoute('show_multiplayer');
		}
		$lobbyHost = $lobby->getHostUserName();
		if ($lobbyHost === $username) 
		{
			return $this->redirectToRoute('show_lobby', ["id" => $lobbyId]);
		} else
		{
			$lobby->setConnectedUserName($username);
			$this->lobbyRepository->saveLobbyToDatabase($lobby);
			return $this->redirectToRoute('show_lobby', ["id" => $lobbyId]);
		}		
	}

	public function disconnectLobby(Request $request): Response
	{
		session_name('auth');
		session_start();
		$username = $_SESSION['username'] ?? null;
		if ($username === null) {
			return $this->redirectToRoute('index');
		}
		$lobbyId = (int)$request->get('id');
		$lobby = $this->lobbyRepository->findLobbyById($lobbyId);
		if ($lobby === null)
		{
			return $this->redirectToRoute('show_multiplayer');
		}
		$lobbyHost = $lobby->getHostUserName();
		if ($lobbyHost === $username) 
		{
			$this->lobbyRepository->deleteLobby($lobby);
			return $this->redirectToRoute('show_multiplayer');
			//return $this->redirectToRoute('show_lobby', ["id" => $lobbyId]);
		} else
		{
			$lobby->setConnectedUserName(null);
			$this->lobbyRepository->saveLobbyToDatabase($lobby);
			return $this->redirectToRoute('show_multiplayer');
			//return $this->redirectToRoute('show_lobby', ["id" => $lobbyId]);
		}		
	}
}