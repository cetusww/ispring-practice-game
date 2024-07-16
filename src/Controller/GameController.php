<?php


namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\Lobby;
use Doctrine\ORM\EntityManagerInterface;

class GameController extends AbstractController
{
	public function index($id, EntityManagerInterface $em): Response
	{
		$lobby = $em->getRepository(Lobby::class)->find($id);
		if (!$lobby || !$lobby->getConnectedUsername()) {
			return $this->redirectToRoute('lobby');
		}

		return $this->render('game.html.twig', [
			'lobbyId' => $id,
			'hostUsername' => $lobby->getHostUsername(),
			'connectedUsername' => $lobby->getConnectedUsername(),
		]);
	}
}