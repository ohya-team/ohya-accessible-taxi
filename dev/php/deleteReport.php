<?php
require_once("../connect_cfd101g2.php");
$sql = "DELETE FROM `art_rep`";
$recover =$pdo->exec($sql);
header('Location:../admin/adminArticleReport.html');
?>