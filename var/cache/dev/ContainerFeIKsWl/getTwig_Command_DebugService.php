<?php

namespace ContainerFeIKsWl;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class getTwig_Command_DebugService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private 'twig.command.debug' shared service.
     *
     * @return \Symfony\Bridge\Twig\Command\DebugCommand
     */
    public static function do($container, $lazyLoad = true)
    {
        include_once \dirname(__DIR__, 4).'/vendor/symfony/console/Command/Command.php';
        include_once \dirname(__DIR__, 4).'/vendor/symfony/twig-bridge/Command/DebugCommand.php';
        include_once \dirname(__DIR__, 4).'/vendor/symfony/http-kernel/Debug/FileLinkFormatter.php';

        $container->privates['twig.command.debug'] = $instance = new \Symfony\Bridge\Twig\Command\DebugCommand(($container->services['.container.private.twig'] ?? $container->load('get_Container_Private_TwigService')), \dirname(__DIR__, 4), $container->parameters['kernel.bundles_metadata'], (\dirname(__DIR__, 4).'/templates'), ($container->privates['debug.file_link_formatter'] ?? ($container->privates['debug.file_link_formatter'] = new \Symfony\Component\HttpKernel\Debug\FileLinkFormatter(NULL))));

        $instance->setName('debug:twig');
        $instance->setDescription('Show a list of twig functions, filters, globals and tests');

        return $instance;
    }
}
