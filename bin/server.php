<?php

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\ORMSetup;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use App\Controller\HeroController;
use Doctrine\DBAL\DriverManager;

require dirname(__DIR__) . '/vendor/autoload.php';

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