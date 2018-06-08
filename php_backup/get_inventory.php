<?php
    require('Utils/connection.php');
    
    $business_id = $_GET["business_id"];
    
    $res = new stdClass();
    
    $select_q = "
    SELECT * FROM product
    INNER JOIN business_has_product ON business_has_product.id_product = product.id AND business_has_product.id_business = ${business_id} AND business_has_product.quantity > -1 ";
    
    $result = $conn->query($select_q);
    
    if (!$result->num_rows) {
        $res->success = 0;
        $res->message = 'You have no products added yet.';
        
        echo json_encode($res);
        return;
    }
    
    $products_array = [];
    
    while($obj = $result->fetch_assoc()) {
        $obj = (object) $obj;
        $obj->checked = 0;
        array_push($products_array, $obj);
    }
    
    $res->success = 1;
    $res->products = $products_array;
    
    echo json_encode($res);
?>