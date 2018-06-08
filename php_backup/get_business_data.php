<?php
    require('Utils/connection.php');
    
    $business_id = $_GET["business_id"];
    
    $res = new stdClass();
    
    $business_data_q = "SELECT address, alias, city FROM business where id = {$business_id} LIMIT 1";
    
    $res_q = $conn->query($business_data_q) or DIE('Error occured');
    $result = $res_q->fetch_object();

    //Count products added to database
    $products_count_q = "
        SELECT COUNT(code) as number FROM product 
        INNER JOIN business_has_product ON business_has_product.id_product = product.id where id_business = {$business_id}";
    $res_count = $conn->query($products_count_q) or DIE('Error occured');
    $result_products_count = $res_count->fetch_object();
    
    //Count current invetory items
    $inventory_count_q = "
        SELECT SUM(quantity) as number, COUNT(id_business) as numer_entities from business_has_product where id_business = {$business_id} AND quantity > -1";
    $res_inventory_count = $conn->query($inventory_count_q) or DIE('Error occured');
    $result_inventory_count = $res_inventory_count->fetch_object();

    
    if(!$result) {
        $res->success = 0;
        $res->message = 'Error occured';
    } else {
        $res->success = 1;
        $result->products_count = $result_products_count->number;
        $result->inventory_count = $result_inventory_count->number;
        $result->inventory_entities_count = $result_inventory_count->numer_entities;
        $res->data = $result;
    }
    
    echo json_encode($res);
    
?>