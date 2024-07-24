<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;
use App\Service\SessionService;
use Endroid\QrCode\Color\Color;

class QrCodeController extends AbstractController
{
    public SessionService $sessionService;
    public function __construct(SessionService $sessionService)
    {
        $this->sessionService = $sessionService;
    }
    public function generateQrCode(): Response
    {
        $this->sessionService->startSession('auth');

        $url = 'http://10.250.104.87:8000/demon-kombat?username=' . $_SESSION['username'];

        // Создайте объект QR-кода
        $qrCode = new QrCode($url);
        $qrCode->setSize(300);
        $qrCode->setForegroundColor(new Color(0, 0, 0));
        $qrCode->setBackgroundColor(new Color(255, 255, 255));

        // Создайте PNG-изображение QR-кода
        $writer = new PngWriter();
        $pngImage = $writer->write($qrCode);

        // Отправьте изображение в браузер
        return new Response(
            $pngImage->getString(),
            200,
            ['Content-Type' => $pngImage->getMimeType()]
        );
    }
}