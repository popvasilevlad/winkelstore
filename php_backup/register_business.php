<?php
    require('Utils/connection.php');
    $json = file_get_contents('php://input');
    $data = (object) json_decode($json, TRUE);
    
    $data->alias = addslashes($data->alias);
    
    $password = hash('sha512', $data->password);
    // validari vezi daca exista e-mail-ul prima data
    //select prima data, sa nu existe un business cu aceleasi date
   
    //Insert into business
    $business_insert_query = "
        INSERT INTO business 
            (alias, address, city)
        VALUES
            ('{$data->alias}', '{$data->address}', '{$data->city}')";
    $conn->query($business_insert_query) or die ($conn->error);

    $added_business_id_query = 
        "SELECT id FROM business WHERE 
        address = '{$data->address}' AND alias = '{$data->alias}' AND city = '{$data->city}'";
    $business_id =  $conn->query($added_business_id_query) or die ($conn->error);
    $business_id = $business_id->fetch_array();
    $business_id = $business_id[0];
    
    
     //Insert into user table
    $insertCredentialQuery = "
        INSERT INTO `credential` 
            (email, password, business_id)
        VALUES
            ('{$data->email}', '{$password}', '{$business_id}')";
    
    
    
    $conn->query($insertCredentialQuery) or die ($conn->error);
    
    //Insert into credential
    $credential_id_query = $conn->query("SELECT id from credential where email = '{$data->email}' ") or DIE ('eroare '. $conn->error);
    $res = $credential_id_query->fetch_array();
    $credential_id = $res[0];
    $data->credential_id = $credential_id[0];
    $insertUserQuery = "INSERT INTO `user` 
    (first_name, last_name, role, credential_id)
    VALUES
    ('{$data->firstname}', '{$data->lastname}', 'ADM', '{$credential_id}')";
     $conn->query($insertUserQuery) or die ('A aparut o eroare la adaugarea userului: ' . $conn->error);
     
     $res = new stdClass();
     $res->success = 1;
     echo json_encode($res);
?>