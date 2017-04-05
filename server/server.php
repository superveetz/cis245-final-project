<?php

// Load Dependencies
require __DIR__ . "/../vendor/autoload.php";
// DB Config
require __DIR__ . "/config/datasources.php";

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Respect\Validation\Validator as Validator;
use \Server\Models\Users\User;

// Create Slim App
$app = new \Slim\App([
    'settings' => [
        'displayErrorDetails' => true,
    ]
]);

// Fetch DI Container
$container = $app->getContainer();

// Register Twig View helper
$container['view'] = function ($c) {
    $view = new \Slim\Views\Twig(__DIR__ . "/views/");

    // Instantiate router and add Slim specific extension
    $basePath = rtrim(str_ireplace('index.php', '', $c['request']->getUri()->getBasePath()), '/');
    $view->addExtension(new Slim\Views\TwigExtension($c['router'], $basePath));

    return $view;
};

// wildcard GET route to force client side routing 
$app->get('/[{param:.*}]', function (Request $request, Response $response) {
    return $this->view->render($response, 'index.html');
})->setName('index');;

// Create Data Models
require_once __DIR__ . '/models/users/User.php';
require_once __DIR__ . '/models/users/UserRepository.php';

// Create Routes
require_once __DIR__ . "/routes/users/users.php";
require_once __DIR__ . "/routes/send-email/send-email.php";

// Run app
$app->run();