<?php

class db {
    private $host   = 'localhost';
    private $user   = 'root';
    private $pass   = '';
    private $name   = 'finalProject';

    // Connect
    public function connect() {
        $connection = new PDO("mysql:host=$this->host;dbname=$this->name;", $this->user, $this->pass);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $connection;
    }
}