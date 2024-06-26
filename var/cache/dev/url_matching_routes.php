<?php

/**
 * This file has been auto-generated
 * by the Symfony Routing Component.
 */

return [
    false, // $matchHost
    [ // $staticRoutes
        '/' => [[['_route' => 'index', '_controller' => 'App\\Controller\\ViewController::index'], null, null, null, false, false, null]],
        '/user/signup' => [[['_route' => 'signup-form', '_controller' => 'App\\Controller\\ViewController::signUpUserForm'], null, null, null, false, false, null]],
        '/user/signin' => [[['_route' => 'signin-form', '_controller' => 'App\\Controller\\ViewController::signInUserForm'], null, null, null, false, false, null]],
        '/signup' => [[['_route' => 'signup', '_controller' => 'App\\Controller\\UserController::signUpUser'], null, null, null, false, false, null]],
        '/signin' => [[['_route' => 'signin', '_controller' => 'App\\Controller\\UserController::signInUser'], null, null, null, false, false, null]],
        '/user/signout' => [[['_route' => 'signout', '_controller' => 'App\\Controller\\UserController::signOutUser'], null, null, null, false, false, null]],
        '/menu' => [[['_route' => 'show_menu', '_controller' => 'App\\Controller\\ViewController::showMenu'], null, null, null, false, false, null]],
    ],
    [ // $regexpList
        0 => '{^(?'
                .'|/_error/(\\d+)(?:\\.([^/]++))?(*:35)'
            .')/?$}sDu',
    ],
    [ // $dynamicRoutes
        35 => [
            [['_route' => '_preview_error', '_controller' => 'error_controller::preview', '_format' => 'html'], ['code', '_format'], null, null, false, true, null],
            [null, null, null, null, false, false, 0],
        ],
    ],
    null, // $checkCondition
];
