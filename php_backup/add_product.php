<?php
    require('Utils/connection.php');
    $json = file_get_contents('php://input');
    $data = (object) json_decode($json, TRUE);
    $data->name = addslashes($data->name);
    $data->description = addslashes($data->description);
    
    error_reporting(0);
    $res = new stdClass();
    
    if(!$data->name || !$data->price || !$data->code) {
       $res->success = 0;
       $res->message = "All fields ar mandatory";
       echo json_encode($res);
    } else {
        $check_code_sql = "
        SELECT * from product
        where name='{$data->code}'";
        
        $result_code = $conn->query($check_code_sql);
        
       if($result_code->fetch_object()) {
            $res->success = 0;
           $res->message = "Duplicate product code";
           echo json_encode($res);
        } else {
            $description = $data->description || '';
            $add_product_sql = "
            INSERT into product
                (name, price, code, description)
            VALUES 
                ('{$data->name}', '{$data->price}', '{$data->code}', '{$description}')";
          
            $conn->query($add_product_sql) or die ($conn->error);
            $product_id = $conn->insert_id;
            
            $add_business_has_product = "
            INSERT into business_has_product
                (id_business, id_product)
            VALUES 
                ({$data->business_id}, {$product_id})";
            $conn->query($add_business_has_product) or die ($conn->error);
            
            $res->success = 1;
            echo json_encode($res);  
        }    
    }
?>