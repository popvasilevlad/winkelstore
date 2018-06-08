<?php
    require('Utils/connection.php');
    
    $json = file_get_contents('php://input');
    $id = json_decode($json);
    
    if ($id) {
        $id_array_to_string = implode(", ", $id);
        
        $delete_product_q = "
        DELETE FROM product 
        WHERE id in ({$id_array_to_string})";
    } else {
        $delete_product_q = "DELETE FROM product where id != 0";

    }
    $conn->query($delete_product_q) or DIE ("Error occured");
  
    $res = new stdClass();
    $res->success = 1;
    
    echo json_encode($res)
    
?>