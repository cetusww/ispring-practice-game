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
				'host' => $userdata['host'],
				'lobby_id' => $userdata['lobby_id'],
			];
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
		$lobbyHost =  $this->arrayOfUsers[$userId]['host'];
		$lobbyUsername =  $this->arrayOfUsers[$userId]['username'];
		if ($lobbyHost === $lobbyUsername)
		{
			//if ($)
			echo 'lobby deleted';
			$sql = "DELETE FROM lobby WHERE id = '$lobbyId'";
			$this->conn->query($sql);
			
		}
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