<?php
require_once "../connect_cfd101g2.php";
$sql = "";
$program = $pdo->prepare($sql);
$program->bindValue(":program_no", $_POST["program_no"]);

header('Location:../admin/adminProgram.html');