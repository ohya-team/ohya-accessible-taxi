<?php
try{
	require_once("../connect_cfd101g2.php");
	$sql = "select * from art";
	$products = $pdo->query($sql);
	$artInfos = $products->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($artInfos);
}catch(PDOException $e){
	//echo $e->getMessage();
	exit("系統暫時不能提供服務");}
	?>