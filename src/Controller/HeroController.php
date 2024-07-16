<?php

namespace App\Controller;
use App\Entity\Lobby;
use App\Repository\LobbyRepository;
use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;
class HeroController implements MessageComponentInterface {
	protected \SplObjectStorage $clients;
	//public LobbyRepository $lobbyRepository;
	// const HOST = 'localhost';
	// const USERNAME = 'yogurt';
	// const PASSWORD = 'pAssw0rd#';
	// const DATABASE = 'ispring_practice';
	public array $arrayOfLobby = [];
	public array $arrayOfUsers = [];
	public \mysqli $conn;// = new \mysqli(HOST, USERNAME, PASSWORD, DATABASE);

	public function createDBConnection(): void {
  
		$this->conn = new \mysqli('localhost', 'yogurt', 'pAssw0rd#', 'ispring_practice');
		if ($this->conn->connect_error) {
		  echo "ConnectionDB failed: " . $this->conn->connect_error;
		} else
		{
			echo "ConnectedDB successfully\n";
		}
	  }


	public function __construct() {
		$this->clients = new \SplObjectStorage;
		//$this->lobbyRepository = $lobbyRepository;
		$this->createDBConnection();
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
			$this->arrayOfUsers[$from->resourceId] = 
				[
					'username' => $userdata['username'], 
					'lobby_id' => $userdata['lobby_id'],
				];
			if (isset($this->arrayOfLobby[$userdata['lobby_id']]))
			{
				if ($this->arrayOfLobby[$userdata['lobby_id']]['host']['name'] === $userdata['username'])
				{
					$this->arrayOfLobby[$userdata['lobby_id']]['host'] = ['name' => $userdata['username'], 'id' => $from->resourceId];	
				} else
				{
					$this->arrayOfLobby[$userdata['lobby_id']]['connected'] = ['name' => $userdata['username'], 'id' => $from->resourceId];
				}
				$this->arrayOfLobby[$userdata['lobby_id']]['lobby_date'] = time();
				var_dump($this->arrayOfLobby);
			} else
			{
				echo 'false';
				$this->arrayOfLobby[$userdata['lobby_id']] = 
				[
					'host' => ['name' => $userdata['username'], 'id' => $from->resourceId],
					'connected' => ['name' => null, 'id' => null], 
					'lobby_date' => time(),
				];
			}
			// if ($userdata['host'] == $userdata['username'])
			// {
			// 	$this->arrayOfLobby[$userdata['lobby_id']] = 
			// 	[
			// 		'host' => ['name' => $userdata['host'], 'id' => $from->resourceId],
			// 		'username' => $userdata['username'], 
			// 		'host' => $userdata['host'],
			// 		'lobby_id' => $userdata['lobby_id'],
			// 		'lobby_date' => time(),
			// 	];
			// }
			
			//var_dump($this->arrayOfUsers);
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
		$this->disconnectLobby($id);
		//var_dump($this->arrayOfUsers);
		
		//header("Location: http://localhost:8000/index", False);
		//header("Location: /lobby/disconnect$lobbyId", True, 301);
		//return $this->redirectToRoute('index');

		//$lobby = $this->lobbyRepository->findLobbyByHostUserName((string)$lobbyHost);
		//var_dump($lobby);
	}

	public function disconnectLobby(int $userId): void
	{
		$lobbyId = $this->arrayOfUsers[$userId]['lobby_id'];
		$username =  $this->arrayOfUsers[$userId]['username'];
		$lobbyHost =  $this->arrayOfLobby[$lobbyId]['host']['name'];
		$lobbyConnected = $this->arrayOfLobby[$lobbyId]['connected']['name'];
		echo $this->arrayOfLobby[$lobbyId]['lobby_date'];
		if ($username === $lobbyHost) 
		{
			if ($lobbyConnected === null)
			{
				unset($this->arrayOfLobby[$lobbyId]);
			}
			else
			{
				$this->arrayOfLobby[$lobbyId]['host'] = $this->arrayOfLobby[$lobbyId]['connected'];
				$this->arrayOfLobby[$lobbyId]['connected'] = ['name' => null, 'id' => null];
			}
		}
		else
		{
			$this->arrayOfLobby[$lobbyId]['connected'] = ['name' => null, 'id' => null];
		}
		unset($this->arrayOfUsers[$userId]);


		//sleep(15);
		// $lobbyId = $this->arrayOfUsers[$userId]['lobby_id'];
		// $lobbyHost =  $this->arrayOfUsers[$userId]['host'];
		// $lobbyUsername =  $this->arrayOfUsers[$userId]['username'];
		// if ($lobbyHost === $lobbyUsername)
		// {
		// 	//if ($)
		// 	echo 'lobby deleted';
		// 	$sql = "DELETE FROM lobby WHERE id = '$lobbyId'";
		// 	$this->conn->query($sql);
			
		// }
		echo 'lobby deleted';
		//$sql = "SELECT * FROM lobby";
		//$result =$this->conn->query($sql);
		//var_dump($result->fetch_assoc());
	}


	public function onError(ConnectionInterface $conn, \Exception $e): void
	{
		echo "An error has occurred: {$e->getMessage()}\n";
		$conn->close();
	}
}