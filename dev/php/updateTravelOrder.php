<?php
require_once "../connect_cfd101g2.php";
$sql = "UPDATE `travel_order` SET TOTAL_PRICE=:total_price,PAYWAY=:ordpayway,PAYWAY_ID=:payway_id,PAYWAY_INSP=:payway_insp,FINAL_PRICE=:final_price WHERE ORDER_NO = :order_no";
$order = $pdo->prepare($sql);
$final_price = $_POST["total_price"] * $_POST["discount_per"];
$order->bindValue(":order_no", $_POST["order_no"]);
$order->bindValue(":total_price", $_POST["total_price"]);
$order->bindValue(":ordpayway", $_POST["ordpayway"]);
$order->bindValue(":payway_id", $_POST["payway_id"]);
$order->bindValue(":payway_insp", $_POST["payway_insp"]);
$order->bindValue(":final_price", $final_price);

$order->execute();

header('Location:../admin/adminTravelOrder.html');
