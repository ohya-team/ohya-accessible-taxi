<?php
try{
	require_once("../connect_cfd101g2.php");
	$sql = "select * from admin";
	$products = $pdo->query($sql);
	$adminInfos = $products->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($adminInfos);
}catch(PDOException $e){
	//echo $e->getMessage();
	exit("系統暫時不能提供服務");}
	?>