<?php

namespace App\Command;

use App\Service\WebSocketServer;
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;
use React\EventLoop\Factory;
use React\Socket\Server as Reactor;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class WebSocketServerCommand extends Command
{
	protected static $defaultName = 'app:websocket-server';

	protected function configure(): void
	{
		$this->setDescription('Starts the WebSocket server.');
	}

	protected function execute(InputInterface $input, OutputInterface $output): int
	{
		$loop = Factory::create();
		$webSock = new Reactor('127.0.0.1:8080', $loop);
		$webServer = new IoServer(new HttpServer(new WsServer(new WebSocketServer())), $webSock, $loop);

		$output->writeln('WebSocket server started on ws://127.0.0.1:8080');
		$loop->run();

		return Command::SUCCESS;
	}
}