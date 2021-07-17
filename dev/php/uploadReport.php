<?php
require_once "../connect_cfd101g2.php";
$sql = "INSERT INTO `art_rep`( `ART_NO`, `REP_REASON`, `REP_STATUS`) VALUES (:art_no,:rep_reason,0)";
$art = $pdo->prepare($sql);
$data = json_decode(file_get_contents("php://input"), true);
$art->bindValue(":art_no", $data["art_no"]);
$art->bindValue(":rep_reason", $data["rep_reason"]);
$art->execute();