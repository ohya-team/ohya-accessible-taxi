<?php
require_once("../connect_cfd101g2.php");
$sql="delete from program where program_no = :delete_no";
$spot =$pdo->prepare($sql);
$spot->bindValue(":delete_no",$_POST["delete_no"]);
$spot->execute();
$sql="delete from program_item where program_no = :delete_no";
$program =$pdo->prepare($sql);
$program->bindValue(":delete_no",$_POST["delete_no"]);
$program ->execute();
header('Location:../admin/adminProgram.html');