<?php
    require('Utils/connection.php');
    
    $business_id = $_GET["business_id"];
    $query = $_GET["q"];
    
    if (!$business_id) die('No business id was sent.');
    
    $products_query = "
        SELECT product.id, product.code, product.name, product.price, product.description 
        FROM product
        JOIN business_has_product ON business_has_product.id_product = product.id AND business_has_product.id_business = {$business_id}
        WHERE product.name like '%{$query}%' OR product.code like '%{$query}%'
    ";
    
    $result = $conn->query($products_query) or die('Error occured');
    $res = new stdClass();
    $res->sql = json_encode($products_query);
    if(!$result->num_rows) {
        $res->success = 0;
        $res->message = 'You have no products registered yet.';
    } else {
        $products_array = [];
        while($obj = $result->fetch_assoc()) {
            array_push($products_array, $obj);
        }
        $res->success = 1;
        $res->products = $products_array;
    }
    
    echo json_encode($res);
    
?>
