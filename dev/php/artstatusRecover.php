
<?php
require_once("../connect_cfd101g2.php");
$sql = "UPDATE `art` SET ART_STATUS = 0";
$recover =$pdo->exec($sql);
header('Location:../admin/adminArticleReport.html');
?>