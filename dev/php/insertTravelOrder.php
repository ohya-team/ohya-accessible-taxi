<?php
require_once "../connect_cfd101g2.php";
$sql = "INSERT INTO `travel_order`( `MEM_NO`, `PROGRAM_NO`, `DISCOUNT_NO`, `DEP_TIME`, `NUMBER_OF_PEOPLE`, `ORDER_L_NAME`, `ORDER_F_NAME`, `ORDER_PHONE`, `ORDER_EMAIL`, `ORDER_ADD`, `PICK_UP_PLACE`, `ORDER_STATUS`, `PURCHASE_ADDITIONAL`) VALUES (:mem_no,:program,:discount,:dep_time,:people_num,:last_name,:first_name,:phone,:email,:ord_add,:pickup_place,0,:remarks)";
$spot = $pdo->prepare($sql);
$data = json_decode(file_get_contents("php://input"), true);
$spot->bindValue(":mem_no", $data["mem_no"]);
$spot->bindValue(":program", $data["program"]);
$spot->bindValue(":discount", $data["discount"]);
$spot->bindValue(":dep_time", $data["dep_time"]);
$spot->bindValue(":people_num", $data["people_num"]);
$spot->bindValue(":last_name", $data["last_name"]);
$spot->bindValue(":first_name", $data["first_name"]);
$spot->bindValue(":phone", $data["phone"]);
$spot->bindValue(":email", $data["email"]);
$spot->bindValue(":ord_add", $data["ord_add"]);
$spot->bindValue(":pickup_place", $data["pickup_place"]);
$spot->bindValue(":remarks", $data["remarks"]);
$spot->execute();