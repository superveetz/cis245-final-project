<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

use \Server\Models\Users\User;
use \Server\Models\Users\UserRepository;

// Register New User
$app->post('/api/users/register-new', function ($request, $response) {
    // parse body for params
    $username       = $request->getParsedBody()['username'];
    $email          = $request->getParsedBody()['email'];
    $password       = $request->getParsedBody()['pass'];

    // hash the submitted password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // create a User Model
    $userModel = new User(array(
        'username'  => $username,
        'email'     => $email,
        'password'  => $hashedPassword
    ));
    
    // create a User Repo
    $db = new UserRepository();

    // call db method
    $result = $db->registerNewUser($userModel);

    // echo json back to client
    echo json_encode($result);

    // exit
    return $result;
});

// Log In
$app->post('/api/users/login', function (Request $request, Response $response) {
    // parse body for params
    $usernameOrEmail    = $request->getParsedBody()['usernameOrEmail'];
    $password           = $request->getParsedBody()['pass'];

    // create a User Model
    $userModel = new User(array(
        'email'     => $usernameOrEmail,
        'username'  => $usernameOrEmail,
        'password'  => $password
    ));

    // create a User Repo
    $db = new UserRepository();

    // call db method
    $result = $db->login($userModel);

    // echo json back to client
    echo json_encode($result);

    // exit
    return $result;
});