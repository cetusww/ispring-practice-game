<?php

namespace App\Service;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class WebSocketServer implements MessageComponentInterface
{
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
		foreach ($this->clients as $client) {
			echo $msg;
			if ($from !== $client) {
				$client->send($msg);
			}
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