<?php
require_once("../connect_cfd101g2.php");
$sql = "UPDATE `art` SET`ART_STATUS`= 1 WHERE ART_NO = :art_no";
$article =$pdo->prepare($sql);
$article->bindValue(":art_no",$_POST["art_no"]);
$article->execute();
header('Location:../usercenterForum.html');