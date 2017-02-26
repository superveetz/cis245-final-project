<?php
namespace Server\Models\Users;

use PDO;
use Exception;
// use model namespace to typecast function params
use Server\Models\Users\User as UserModel;

/**
* User Repository
*/
class UserRepository {
    protected $db_host = 'localhost';
    protected $db_name = 'finalProject';
    protected $db_user = 'root';
    protected $db_pass = '';
    
    public function __construct(PDO $db = null) {
        $this->db = $db;

        if ($this->db === null) {
            // db connectikon string
            $dsn = "mysql:host={$this->db_host};dbname={$this->db_name};";
            // create db connection
            $this->db = new PDO(
                $dsn,
                $this->db_user,
                $this->db_pass
            );

            // set error mode on to always throw exceptions
            $this->db->setAttribute(
                    PDO::ATTR_ERRMODE,
                    PDO::ERRMODE_EXCEPTION
            );
        }
    }

    private function save(UserModel $user) {
        // create sql query
        $query = $this->db->prepare(
            'INSERT INTO users (username, email, password) 
            VALUES (:username, :email, :password)'
        );

        // bind params
        $query->bindParam(':username',  $user->username);
        $query->bindParam(':email',     $user->email);
        $query->bindParam(':password',  $user->password);

        // execute db command
        $query->execute();

        // set the id of the newly created user 
        $user->id = $this->db->lastInsertId();

        // remove their password
        unset($user->password);
        
        // return $user
        return $user;
    }

    public function registerNewUser(UserModel $user) {
        // check if username or email exist in db first
        $query = $this->db->prepare(
            'SELECT username, email FROM users 
            WHERE email=:email 
            OR username=:username'
        );

        // bind param
        $query->bindParam(':email',     $user->email);
        $query->bindParam(':username',  $user->username);

        // execute db command
        $query->execute();

        // fetch query obj
        $result = $query->fetch(PDO::FETCH_OBJ);
        
        // exit with error if user already exists
        if ($result) throw new Exception('Email or username already exists');

        // create a new user
        $result = $this->save($user);

        // return result
        return $result;
    }

    public function login(UserModel $user) {
        // check if email exists in db
        $query = $this->db->prepare(
            'SELECT id, username, password FROM users 
            WHERE email=:emailOrPass 
            OR username=:emailOrPass'
        );

        // bind param
        $query->bindParam(':emailOrPass',  $user->email);

        // execute db command
        $query->execute();
        
        // fetch query obj
        $result = $query->fetch(PDO::FETCH_OBJ);

        // exit with error if no user is found
        if (!$result) throw new Exception('Invalid login credentials');
        
        // check if the correct password was provided
        $verifyPassword = password_verify($user->password, $result->password);

        // exit with error if password provided was incorrect
        if (!$verifyPassword) throw new Exception('Invalid login credentials');

        // echo the results back
        unset($result->password);
        
        // return $result
        return $result;
    }
}