<?php
try{
	require_once("../connect_cfd101g2.php");
	$sql = "select * from serve";
	$products = $pdo->query($sql);
	$serveInfos = $products->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($serveInfos);
}catch(PDOException $e){
	echo $e->getMessage();
	exit("系統暫時不能提供服務");}
	?>