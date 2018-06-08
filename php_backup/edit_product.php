<?php
    require('Utils/connection.php');
    $json = file_get_contents('php://input');
    $data = (object) json_decode($json, TRUE);
    
    $res = new stdClass();
    
    $attributes = '';
    
    foreach ($data->changes as $change) {
        $change = (object) $change;
        
        if ($change->name == 'code') {
            
            $check_code_sql = "
            SELECT * from product
            where code='{$change->value}'";
            
            $result_code = $conn->query($check_code_sql);
            
            if($result_code->fetch_object()) {
                $res->success = 0;
                $res->message = "Duplicate product code";
                
                echo json_encode($res);
                return;
            } 
        }
        $attributes ="{$attributes} {$change->name} = '{$change->value}',";
    }
    $attributes = substr($attributes, 0, strlen($attributes) - 1);
    
    $sql = "UPDATE product SET {$attributes} WHERE id = {$data->id}";

    $conn->query($sql) or DIE('Error occured :(');
    
    $res->success = 1;

    echo json_encode($res);
?>