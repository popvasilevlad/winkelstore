<?php
    require('Utils/connection.php');
    
    $json = file_get_contents('php://input');
    $data = (object) json_decode($json, TRUE);
    
    $password = hash('sha512', $data->password);

    // $loginQuery = "SELECT * FROM credential where email = '{$data->email}' AND password = '{$password}'";
    $loginQuery = "
    SELECT * FROM 
        ( SELECT user.*, credential.email, credential.password, credential.business_id
        FROM user LEFT OUTER JOIN credential ON user.credential_id = credential.id) as t1
    WHERE email = '{$data->email}' AND password = '{$password}'";
    $result = $conn->query($loginQuery);
    $user = $result->fetch_object();
    
    $res = new stdClass();
    if (count($user)) {
        $res->success = 1;
        $res->message = "Login efectuat cu success";
        // get_user_data($user);
        $res->data = $user;
        
    } else {
        $res->success = 0;
        $res->message = "Username sau parolă incorectă";
    }
    echo json_encode($res);
    
    
    function get_user_data($user) {
        $getUserDataQuery = "
        SELECT * FROM 
            SELECT *
            FROM user
            LEFT OUTER JOIN credential ON user.credential_id = credential.id
        WHERE email = '{$data->email}' AND password = '{$password}'";
    
        echo $getUserDataQuery;
    }
?>