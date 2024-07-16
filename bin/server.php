<?php
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMSetup;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use App\Controller\HeroController;
use App\Repository\LobbyRepository;
use Doctrine\DBAL\DriverManager;
require dirname(__DIR__) . '/vendor/autoload.php';
//APP_DATABASE_DNS="pdo-mysql://yogurt:pAssw0rd%23@localhost:3306/ispring_practice"
// $paths = array(__DIR__ . "/src");

// // Параметры подключения к базе данных
// $isDevMode = true;
// $dbParams = [
//     'driver'   => 'pdo_mysql',
//     'user'     => 'yogurt',
//     'password' => 'pAssw0rd%23',
//     'dbname'   => 'ispring_practice',
// ];

// $config = ORMSetup::createAttributeMetadataConfiguration($paths, $isDevMode);
// $connection = DriverManager::getConnection($dbParams, $config);

// // Создание EntityManager
// $entityManager = new EntityManager($connection, $config);
// $lobbyRepository = new LobbyRepository($entityManager);

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new HeroController()
        )
    ),
    8080,
    '0.0.0.0'
);

$server->run();