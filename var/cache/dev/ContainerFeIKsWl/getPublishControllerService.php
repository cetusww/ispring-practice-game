<?php

namespace ContainerFeIKsWl;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class getPublishControllerService extends App_KernelDevDebugContainer
{
    /**
     * Gets the public 'App\Controller\PublishController' shared autowired service.
     *
     * @return \App\Controller\PublishController
     */
    public static function do($container, $lazyLoad = true)
    {
        include_once \dirname(__DIR__, 4).'/vendor/symfony/framework-bundle/Controller/AbstractController.php';
        include_once \dirname(__DIR__, 4).'/src/Controller/PublishController.php';

        $container->services['App\\Controller\\PublishController'] = $instance = new \App\Controller\PublishController();

        $instance->setContainer(($container->privates['.service_locator.mx0UMmY'] ?? $container->load('get_ServiceLocator_Mx0UMmYService'))->withContext('App\\Controller\\PublishController', $container));

        return $instance;
    }
}