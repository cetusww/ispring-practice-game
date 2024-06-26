<?php

// This file has been auto-generated by the Symfony Routing Component.

return [
    '_preview_error' => [['code', '_format'], ['_controller' => 'error_controller::preview', '_format' => 'html'], ['code' => '\\d+'], [['variable', '.', '[^/]++', '_format', true], ['variable', '/', '\\d+', 'code', true], ['text', '/_error']], [], [], []],
    'index' => [[], ['_controller' => 'App\\Controller\\ViewController::index'], [], [['text', '/']], [], [], []],
    'signup-form' => [[], ['_controller' => 'App\\Controller\\ViewController::signUpUserForm'], [], [['text', '/user/signup']], [], [], []],
    'signin-form' => [[], ['_controller' => 'App\\Controller\\ViewController::signInUserForm'], [], [['text', '/user/signin']], [], [], []],
    'signup' => [[], ['_controller' => 'App\\Controller\\UserController::signUpUser'], [], [['text', '/signup']], [], [], []],
    'signin' => [[], ['_controller' => 'App\\Controller\\UserController::signInUser'], [], [['text', '/signin']], [], [], []],
    'signout' => [[], ['_controller' => 'App\\Controller\\UserController::signOutUser'], [], [['text', '/user/signout']], [], [], []],
    'show_menu' => [[], ['_controller' => 'App\\Controller\\ViewController::showMenu'], [], [['text', '/menu']], [], [], []],
];
