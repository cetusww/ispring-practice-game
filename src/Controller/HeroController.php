<?php

namespace App\Controller;

use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;
class HeroController implements MessageComponentInterface {
	protected \SplObjectStorage $clients;

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

		$direction = $data['direction'];

		$newDirection = json_encode($direction);

		foreach ($this->clients as $client) {
			$client->send($newDirection);
		}
	}

	public function onClose(ConnectionInterface $conn): void
	{
		$this->clients->detach($conn);
		echo "Connection {$conn->resourceId} has disconnected\n";
	}

	public function onError(ConnectionInterface $conn, \Exception $e): void
	{
		echo "An error has occurred: {$e->getMessage()}\n";
		$conn->close();
	}
}