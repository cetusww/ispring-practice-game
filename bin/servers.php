<?php

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMSetup;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use App\Controller\MultiplayerController;
use App\Controller\DemonCombatController;
use Doctrine\DBAL\DriverManager;

require dirname(__DIR__) . '/vendor/autoload.php';

// Создание EntityManager
$config = ORMSetup::createAnnotationMetadataConfiguration([], true);
$conn = DriverManager::getConnection(['url' => 'pdo-mysql://yogurt:pAssw0rd%23@localhost:3306/ispring_practice']);
$entityManager = EntityManager::create($conn, $config);

// Создание серверов для разных контроллеров
$multiplayerServer = IoServer::factory(
    new HttpServer(
        new WsServer(
            new MultiplayerController()
        )
    ),
    8081, // Порт для MultiplayerController
    '0.0.0.0'
);

$miniGameServer = IoServer::factory(
    new HttpServer(
        new WsServer(
            new DemonCombatController($entityManager)
        )
    ),
    8082, // Порт для MiniGameController
    '0.0.0.0'
);

// Запуск серверов
$multiThread = new \React\Promise\Promise(function($resolve) use ($multiplayerServer) {
    $multiplayerServer->run();
});

$miniThread = new \React\Promise\Promise(function($resolve) use ($miniGameServer) {
    $miniGameServer->run();
});

\React\Promise\all([$multiThread, $miniThread])->then(function() {
    echo "Servers are running...\n";
});
