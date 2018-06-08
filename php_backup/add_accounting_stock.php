<?php 
    require('Utils/connection.php');
    $json = file_get_contents('php://input');
    $data = (object) json_decode($json, TRUE);
    
    $res = new stdClass();
    $res->exceptions = [];
    
    
    //Reset business_has_product for current business
    $update_not_added_products_sql = "UPDATE business_has_product
    SET quantity = 0
    WHERE quantity = -1 AND id_business = {$data->business_id}";
    $conn->query($update_not_added_products_sql);
    
    $reset_sql = "UPDATE business_has_product SET accounting_quantity = null, differences =  quantity WHERE id_business = {$data->business_id}";
    $conn->query($reset_sql);
    

    
    //Iterate through every item of excel
    foreach($data->products as $product) {
        $product = (object) $product;
        
        //Get products id from product table
        $get_id_sql = "SELECT id from product where code = {$product->barcode}";
        $result_get_id_sql = $conn->query($get_id_sql);
        $result_id = $result_get_id_sql->fetch_object();
        
        //Check if product exists
        if(!$result_id) {
            array_push($res->exceptions, "Product having barcode {$product->barcode} does not exist in your database");
        } else {
            $product_id = $result_id->id;
            
            //Check if product belongs to business
            $check_business_has_product_sql = "SELECT * from business_has_product where id_product = {$product_id} AND id_business = {$data->business_id}";
            $result_business_has_product = $conn->query($check_business_has_product_sql);
            if (!$result_business_has_product->fetch_object()) {
                 array_push($res->exceptions, "No product having barcode {$product->barcode} does not exist in your database");
            } else {
                

                
                $update_inventory_sql = "
                UPDATE business_has_product
                SET differences = differences - {$product->quantity}, accounting_quantity = {$product->quantity}
                WHERE id_product = {$product_id} AND id_business = {$data->business_id}";
                $conn->query($update_inventory_sql) or DIE ('Error occured');
            }
        }
        
        
    }
    $res->success = 1;
    echo json_encode($res);
?>