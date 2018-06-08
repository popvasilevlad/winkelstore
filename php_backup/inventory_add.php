<?php
    require('Utils/connection.php');
    $json = file_get_contents('php://input');
    $data = (object) json_decode($json, TRUE);
    
    if (property_exists($data, 'observations')) {
        $observations = addslashes($data->observations);
    } else {
        $observations = '';
    }
    $res = new stdClass();
    
    $get_product_id_q = "SELECT id from product where code = {$data->code}";
    $get_product_id_q_res = $conn-> query($get_product_id_q);
    $result = $get_product_id_q_res->fetch_object();
    
    
    if (!property_exists($data, 'quantity')) {
        $res->success = 0;
        $res->message = 'Insert quantity';
        
        echo json_encode($res);
        return;
    }
    
    if(!$result) {
        $res->success = 0;
        $res->message = 'Barcode not found';
        
        echo json_encode($res);
        return;
    }
    
    $product_id = $result->id;
    
    $get_quantity_q = "SELECT quantity from business_has_product WHERE id_business = {$data->business_id} AND id_product = {$product_id}";
    $result_quantity = $conn->query($get_quantity_q);
    $res_quantity = $result_quantity->fetch_object();
    
    if($res_quantity->quantity == -1) {
        $set_quantity_0 = " UPDATE business_has_product
        SET quantity = 0
        WHERE id_business = {$data->business_id} AND id_product = {$product_id}";
        $conn->query($set_quantity_0) or die ('Error occured');
    }
    $inventory_add_q = "
        UPDATE business_has_product
        SET quantity = quantity + {$data->quantity}, observations = '{$observations}'
        WHERE id_business = {$data->business_id} AND id_product = {$product_id}
    ";
    $conn->query($inventory_add_q) or die ("Error occured at inserting product");
  
   $res->success = 1;
   echo json_encode($res);
?>