<?php


namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;

class MovementController extends AbstractController
{
	public function move(Request $request, HubInterface $hub): JsonResponse
	{
		$data = json_decode($request->getContent(), true);
		$update = new Update(
			'https://localhost:8002/game',
			json_encode(['keys' => $data['keys']])
		);
		$hub->publish($update);

		return new JsonResponse(['status' => 'success']);
	}
}