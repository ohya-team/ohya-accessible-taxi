<?php
require_once("../connect_cfd101g2.php");
$sql="delete from spot where spot_no = :delete_no";
$spot =$pdo->prepare($sql);
$spot->bindValue(":delete_no",$_POST["delete_no"]);
$spot->execute();
header('Location:../admin/adminSpot.html');
