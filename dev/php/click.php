<?php
require_once("../connect_cfd101g2.php");
$sql = "UPDATE `art` SET`ART_CLICK`=ART_CLICK+1 WHERE ART_NO=:ART_NO";
// $sql1 = "SELECT `ART_NO` FROM `art` ORDER BY `ART_NO` DESC LIMIT 1";
$click =$pdo->prepare($sql);
$click->bindValue(":ART_NO",$_GET["ART_NO"]);
$click->execute();

header('Location:../forumDetail.html?ART_NO=' . $_GET["ART_NO"]);


?>