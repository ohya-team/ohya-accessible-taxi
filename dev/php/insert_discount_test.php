<?php
require_once "../connect_cfd101g2.php";
$sql = "INSERT INTO `discount`( `MEMBER_NO`, `DISCOUNT_NUM`, `DISCOUNT_RES`,`DISCOUNT_STATUS`) VALUES (:member_no,:discount_num,:discount_res,0)";
$art = $pdo->prepare($sql);
$discount_num = substr(time(),-6);
$data = json_decode(file_get_contents("php://input"), true);
$art->bindValue(":member_no", $data["member_no"]);
$art->bindValue(":discount_num", $discount_num);
$art->bindValue(":discount_res", $data["discount_res"]);
$art->execute();
