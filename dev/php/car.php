<?php
try{
	require_once("../connect_cfd101g2.php");
	$sql = "select * from car ";
	$products = $pdo->query($sql);
	$carInfos = $products->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($carInfos);
}catch(PDOException $e){
	exit("系統暫時不能提供服務");}
	?>