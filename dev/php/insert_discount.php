<?php
require_once "../connect_cfd101g2.php";
$sql = "INSERT INTO `discount`( `MEMBER_NO`, `DISCOUNT_NUM`, `DISCOUNT_RES`,`DISCOUNT_STATUS`) VALUES (:member_no,:discount_num,:discount_res,0)";
$art = $pdo->prepare($sql);
$discount_num = substr(time(),-6);
$art->bindValue(":member_no", $_POST["member_no"]);
$art->bindValue(":discount_num", $discount_num);
$art->bindValue(":discount_res", $_POST["discount_res"]);
$art->execute();
