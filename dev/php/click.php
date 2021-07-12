<?php
require_once("../connect_cfd101g2.php");
$sql="UPDATE `art` SET `ART_CLICK` = :ART_CLICK WHERE `art`.`ART_NO` = :ART_NO";
$click =$pdo->prepare($sql);
$click ->bindValue(":ART_CLICK",$_POST["ART_CLICK"]);
$click ->bindValue(":ART_NO",$_POST["ART_NO"]);
$click->execute();
?>