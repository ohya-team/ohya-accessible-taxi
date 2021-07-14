<?php
require_once "../connect_cfd101g2.php";
$sql = "UPDATE `order` SET `MEM_NO`=:mem_no,`ORDER_L_NAME`=:order_l_name,`ORDER_F_NAME`=:order_f_name,`ORDER_PHONE`=:order_phone,`ORDER_EMAIL`=:order_email,`ORDER_ADD`=:order_add,`PICK_UP_PLACE`=:pick_up_place,CAR_TYPE=:car_type,NUMBER_OF_PEOPLE=:number_of_people,PURCHASE_ADDITIONAL=:purchase_additional,DISCOUNT_NO=:discount_no,TOTAL_PRICE=:total_price,ORDPAYWAY=:ordpayway,PAYWAY_ID=:payway_id,PAYWAY_INSP=:payway_insp,ORDER_STATUS=:order_status WHERE ORDER_NO = :order_no";
$order = $pdo->prepare($sql);
$order->bindValue(":order_no", $_POST["order_no"]);
$order->bindValue(":mem_no", $_POST["mem_no"]);
$order->bindValue(":order_l_name", $_POST["order_l_name"]);
$order->bindValue(":order_f_name", $_POST["order_f_name"]);
$order->bindValue(":order_phone", $_POST["order_phone"]);
$order->bindValue(":order_email", $_POST["order_email"]);
$order->bindValue(":order_add", $_POST["order_add"]);
$order->bindValue(":pick_up_place", $_POST["pick_up_place"]);
$order->bindValue(":car_type", $_POST["car_type"]);
$order->bindValue(":number_of_people", $_POST["number_of_people"]);
$order->bindValue(":purchase_additional", $_POST["purchase_additional"]);
$order->bindValue(":discount_no", $_POST["discount_no"]);
$order->bindValue(":total_price", $_POST["total_price"]);
$order->bindValue(":ordpayway", $_POST["ordpayway"]);
$order->bindValue(":payway_id", $_POST["payway_id"]);
$order->bindValue(":payway_insp", $_POST["payway_insp"]);
$order->bindValue(":order_status", $_POST["order_status"]);
$uploadArr = [];

$order->execute();

header('Location:../admin/adminTravelOrder.html');