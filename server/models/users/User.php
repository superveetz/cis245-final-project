<?php
namespace Server\Models\Users;

/**
* User
*/
class User {
    public $id;
    public $username;
    public $email;
    public $password;

    public function __construct($data = null) {
        if (is_array($data)) {
            $this->username     = isset($data['username']) ? $data['username'] : '';
            $this->email        = isset($data['email'])    ? $data['email']    : '';
            $this->password     = isset($data['password']) ? $data['password'] : '';
        }
    }
}