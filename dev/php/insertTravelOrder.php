<?php
require_once "../connect_cfd101g2.php";
$sql = "INSERT INTO `travel_order`( `MEM_NO`, `PROGRAM_NO`, `DISCOUNT_NO`, `DEP_TIME`, `NUMBER_OF_PEOPLE`, `ORDER_L_NAME`, `ORDER_F_NAME`, `ORDER_PHONE`, `ORDER_EMAIL`, `ORDER_ADD`, `PICK_UP_PLACE`, `ORDER_STATUS`, `PURCHASE_ADDITIONAL`) VALUES (:mem_no,:program,:discount,:dep_time,:people_num,:last_name,:first_name,:phone,:email,:ord_add,:pickup_place,0,:remarks)";
$order = $pdo->prepare($sql);
$data = json_decode(file_get_contents("php://input"), true);
$orderArr = ['mem_no', 'program', 'discount', 'dep_time', 'people_num', 'last_name', 'first_name', 'phone', 'email', 'ord_add', 'pickup_place', 'remarks'];
foreach ($orderArr as $value) {
    $order->bindValue(":" . $value, $data[$value]);
}
$order->execute();
