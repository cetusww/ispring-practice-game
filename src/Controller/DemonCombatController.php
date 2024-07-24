<?php

namespace App\Controller;

use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;
use Doctrine\ORM\EntityManagerInterface;

class DemonCombatController implements MessageComponentInterface
{
    protected \SplObjectStorage $clients;
    private EntityManagerInterface $entityManager;
    private array $users = [];

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->clients = new \SplObjectStorage;
        $this->entityManager = $entityManager;
    }

    public function onOpen(ConnectionInterface $conn): void
    {
        $this->clients->attach($conn);
        echo "New connection for mini-game! ({$conn->resourceId})\n";

        // Получение идентификатора пользователя из URL
        $queryParams = $this->parseUrlQuery($conn->httpRequest->getUri()->getQuery());
        $userId = $queryParams['user_id'] ?? null;

        if ($userId) {
            $this->users[$conn->resourceId] = $userId;
        } else {
            // Закрытие соединения, если пользователь не найден
            $conn->close();
        }
    }

    public function onMessage(ConnectionInterface $from, $msg): void
    {
        $data = json_decode($msg, true);

        if (isset($data['score']) && isset($this->users[$from->resourceId])) {
            $userId = $this->users[$from->resourceId];
            $this->updateUserScore($userId, $data['score']);
        }
    }

    public function onClose(ConnectionInterface $conn): void
    {
        $this->clients->detach($conn);
        unset($this->users[$conn->resourceId]);
        echo "Connection {$conn->resourceId} has disconnected from mini-game\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e): void
    {
        echo "An error has occurred in mini-game: {$e->getMessage()}\n";
        $conn->close();
    }

    private function parseUrlQuery($query): array
    {
        parse_str($query, $params);
        return $params;
    }

    private function updateUserScore($userId, $score): void
    {
        $user = $this->entityManager->getRepository(User::class)->find($userId);
        if ($user) {
            $user->setScore($user->getScore() + $score);
            $this->entityManager->flush();
            echo "Updated user {$userId} score to {$user->getScore()}\n";
        }
    }
}