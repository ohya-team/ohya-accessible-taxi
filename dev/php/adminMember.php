<?php
try{
	require_once("../connect_cfd101g2.php");
	$sql = "select * from member";
	$products = $pdo->query($sql);
	$memInfos = $products->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($memInfos);
}catch(PDOException $e){
	//echo $e->getMessage();
	exit("系統暫時不能提供服務");}
	?>