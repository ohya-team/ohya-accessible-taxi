<?php
try{
	require_once("../connect_cfd101g2.php");
	$sql = "SELECT * FROM `art` ORDER BY rand() LIMIT 4";
	$art = $pdo->query($sql);
	$randomArticle = $art->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($randomArticle);
}catch(PDOException $e){
	echo $e->getMessage();
	exit("系統暫時不能提供服務");}
	?>