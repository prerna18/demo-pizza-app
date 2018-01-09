<?php

if( $_POST["data"] ) {
	$data =  json_decode(stripslashes($_POST["data"]));
	$custName = $_POST["name"];
	$custAddress = $_POST["address"];
	$coupon = $_POST["coupon"];
	$price = $_POST["tolPrice"];
	
	$str = file_get_contents('orders.json');
	$json = json_decode($str,true);
	
	$order['pizzas'] = $data;
	$order['name'] = $custName;
	$order['address'] = $custAddress;
	$order['coupon'] = $coupon;
	$order['price'] = $price;
	
	$arr[0] = $order;
	
	//echo (print_r($order));
	$consolidate_orders = array_merge($json, $arr);
	$encode_orders = json_encode($consolidate_orders);
	file_put_contents('orders.json', $encode_orders);
}
else {
	die('order not saved');
}
?>