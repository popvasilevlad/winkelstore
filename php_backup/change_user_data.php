<?php
    require('Utils/connection.php');
    $json = file_get_contents('php://input');
    $data = (object) json_decode($json, TRUE);
    
    $res = new stdClass();
    
    if($data->section == 'business_data') {
        $updates = '';
        
        if(isset($data->alias)) {
            $data->alias = addslashes($data->alias);
            $updates = $updates .  "alias = '{$data->alias}',";
        }
        
        if(isset($data->address)) {
            $data->address = addslashes($data->address);
            $updates = $updates .   "address = '{$data->address}',";
        }
        
        if(isset($data->city)) {
            $data->city = addslashes($data->city);
            $updates = $updates .   "city = '{$data->city}',";
        }
        
        if(strlen($updates))  {
            $updates = substr($updates, 0, strlen($updates) - 1);
        
            $user = (object) $data->data;
             
            $update_sql = "
            UPDATE business 
            SET {$updates}
            WHERE id = {$user->business_id}
            ";
    
            $conn->query($update_sql) or DIE('Error occured');
        }
        $res->success = 1;
        
    }
    
    if($data->section == 'profile_data') {
        $updates = '';
        
        if(isset($data->first_name)) {
            $data->first_name = addslashes($data->first_name);
            $updates = $updates .  "first_name = '{$data->first_name}',";
        }
        
        if(isset($data->last_name)) {
            $data->last_name = addslashes($data->last_name);
            $updates = $updates .   "last_name = '{$data->last_name}',";
        }
        
        if(strlen($updates))  {
            $updates = substr($updates, 0, strlen($updates) - 1);
        
            $update_sql = "
            UPDATE user 
            SET {$updates}
            WHERE id = {$data->id}
            ";
            
            $conn->query($update_sql) or DIE('Error occured');
        }
        $res->success = 1;
        
    }
    
    if($data->section == 'email_section') {
        if (isset($data->email) && strlen($data->email)>0) {
                    $credential_id_q = "SELECT credential_id FROM user where id = {$data->id}";
            $res = $conn->query($credential_id_q);
            $credential = $res->fetch_object();
            
            $update_sql = "
            UPDATE credential 
            SET email = '{$data->email}'
            WHERE id = {$credential->credential_id}
            ";
            
            $conn->query($update_sql) or DIE('Error occured');
        }
        
        $res->success = 1;
    }
    
    if($data->section == 'password_section') {
        
        if (strlen($data->password_actual) && strlen($data->password_new) && strlen($data->password_new_repeat)) {
           if($data->password_new != $data->password_new_repeat) {
               $res->success = 0;
               $res->message = "Passwords does not match";
           } else {
                $password_actual = hash('sha512', $data->password_actual);
               
                $credential_id_q = "SELECT credential_id FROM user where id = {$data->id}";
                $res = $conn->query($credential_id_q);
                $credential_from_user = $res->fetch_object();
                
                $actual_password_q = "SELECT password from credential where id = {$credential_from_user->credential_id}";
                $res = $conn->query($actual_password_q);
                $credential = $res->fetch_object();
                
                if($password_actual !== $credential->password) {
                    $res->success = 0;
                    $res->message = "Invalid actual password";
                } else {
                    $new_pasword = hash('sha512', $data->password_new);
           
                    $update_sql = "
                    UPDATE credential 
                    SET password = '{$new_pasword}'
                    WHERE id = {$credential_from_user->credential_id}
                    ";
                    
                    $conn->query($update_sql) or DIE('Error occured');
                    
                    $res->success = 1;
                }
           }
           
          
        } else {
            $res->success = 0;
            $res->message = "All fields are mandatory";
            
        }
    }
    
    
    $loginQuery = "
         SELECT * FROM 
        ( SELECT user.*, credential.email, credential.password, credential.business_id
        FROM user LEFT OUTER JOIN credential ON user.credential_id = credential.id) as t1
        WHERE id = '{$data->id}'";
    $result = $conn->query($loginQuery);
    $user = $result->fetch_object();
    $res->data = $user;
    
    echo json_encode($res);

?>