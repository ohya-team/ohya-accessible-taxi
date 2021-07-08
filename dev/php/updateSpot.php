<?php
require_once "../connect_cfd101g2.php";
$sql = "UPDATE `spot` SET `SPOT_NAME`=:spot_name,`SPOT_CAT`=:spot_cat,`SPOT_INFO`=:spot_info,`SPOT_MIN_INFO`=:spot_min_info,`SPOT_SLOGAN`=:spot_slogan,`SPOT_STATUS`=:spot_status,`SPOT_STATUS_S`=:spot_status_s WHERE SPOT_NO = :spot_no";
$spot = $pdo->prepare($sql);
$spot->bindValue(":spot_no", $_POST["spot_no"]);
$spot->bindValue(":spot_name", $_POST["spot_name"]);
$spot->bindValue(":spot_cat", $_POST["spot_cat"]);
$spot->bindValue(":spot_info", $_POST["spot_info"]);
$spot->bindValue(":spot_min_info", $_POST["spot_min_info"]);
$spot->bindValue(":spot_slogan", $_POST["spot_slogan"]);
$spot->bindValue(":spot_status", $_POST["spot_status"]);
$spot->bindValue(":spot_status_s", $_POST["spot_status_s"]);
$spot->execute();
header('Location:../admin/adminSpot.html');
