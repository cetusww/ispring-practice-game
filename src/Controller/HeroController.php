<?php

namespace App\Controller;
use App\Entity\Lobby;
use App\Repository\LobbyRepository;
use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;
use Symfony\Component\HttpFoundation\Response;
class HeroController implements MessageComponentInterface {
	protected \SplObjectStorage $clients;
	$entityManager = $container->get(EntityManagerInterface::class);
	public LobbyRepository $lobbyRepository = new LobbyRepository();

	public array $arrayOfUsers = [];

	public function __construct(LobbyRepository $lobbyRepository) {
		$this->clients = new \SplObjectStorage;
		$this->lobbyRepository = $lobbyRepository;
		
	}

	public function onOpen(ConnectionInterface $conn): void
	{
		$this->clients->attach($conn);
		echo "New connection! ({$conn->resourceId})\n";
	}

	public function onMessage(ConnectionInterface $from, $msg): void
	{
		if (!$msg) {
			echo "Invalid message\n";
		}
		echo "Received message: $msg\n";  // Отладочное сообщение
		$data = json_decode($msg, true);
		if (isset($data['userdata']))
		{
			$userdata = $data['userdata'];
			$this->arrayOfUsers[$from->resourceId] = ['username' => $userdata['username'], 'host' => $userdata['host']];
			var_dump($this->arrayOfUsers);
		}
		
		//echo $data['msg'];
		//if ($data['msg'])
		// if ($data['msg'] == 'PING')
		// {
		// 	$direction = 'Server Pong';
		// 	$newDirection = json_encode($direction);
		// 	$from->send($newDirection);
		// }
		// else {
		// 	$direction = 'Server Pong';

		// 	$newDirection = json_encode($direction);
		// 	foreach ($this->clients as $client) {
		// 		$client->send($newDirection);
				
		// 	}
		// }
	}

	public function onClose(ConnectionInterface $conn): Response
	{
		

		$this->clients->detach($conn);
		$id = $conn->resourceId;
		echo "Connection {$id} has disconnected\n";
		//var_dump($this->arrayOfUsers);
		$lobbyHost = $this->arrayOfUsers[$id]['host'];
		echo $lobbyHost;
		return $this->redirectToRoute('index');

		//$lobby = $this->lobbyRepository->findLobbyByHostUserName((string)$lobbyHost);
		//var_dump($lobby);
	}

	public function onError(ConnectionInterface $conn, \Exception $e): void
	{
		echo "An error has occurred: {$e->getMessage()}\n";
		$conn->close();
	}
}