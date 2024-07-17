<?php

namespace App\Controller;
use App\Entity\Lobby;
use App\Repository\LobbyRepository;
use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;
class HeroController implements MessageComponentInterface {
	protected \SplObjectStorage $clients;
	public array $arrayOfUsers = [];


	public function __construct() {
		$this->clients = new \SplObjectStorage;
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
		if (isset($data['username']))
		{
			if (count($this->arrayOfUsers) === 2)
			{
				$from->send(json_encode('kick'));
			}
			else
			{
				$this->arrayOfUsers[$from->resourceId] = $data['username'];
				if (count($this->arrayOfUsers) === 2)
				{
					//$keys = array_keys($this->arrayOfUsers);
					$players = [];
					foreach ($this->clients as $client) {
						$players[] = ['user' => $client, 'name' => $this->arrayOfUsers[$client->resourceId]];
					}
					$players[0]['user']->send(json_encode(['state' => 'ready', 'opponentname' => $players[1]['name']]));
					$players[1]['user']->send(json_encode(['state' => 'ready', 'opponentname' => $players[0]['name']]));
				}
			}
			
		}
		if (isset($data['playerdata'])) 
		{
			$playerData = $data['playerdata'];
			foreach ($this->clients as $client) {
				if ($client->resourceId !== $from->resourceId)
				{
					$client->send(json_encode(
					[
						'opponentupdate' => 
						[
							'x' => $playerData['x'], 
							'y' => $playerData['y'],
							'animatetype' => $playerData['animatetype'],
							'scalex' => $playerData['scalex'],
						]
					]));
				}
			}
		}
		if (isset($data['msg'])) 
		{
			if ($data['msg'] == 'PING') 
			{
				$from->send(json_encode('Server Pong'));
			}
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

	public function onClose(ConnectionInterface $conn): void
	{
		$this->clients->detach($conn);
		$id = $conn->resourceId;
		echo "Connection {$id} has disconnected\n";
		unset($this->arrayOfUsers[$id]);
		foreach ($this->clients as $client) {
			$client->send(json_encode(['state' => 'stop']));
		}
	}

	public function onError(ConnectionInterface $conn, \Exception $e): void
	{
		echo "An error has occurred: {$e->getMessage()}\n";
		$conn->close();
	}
}