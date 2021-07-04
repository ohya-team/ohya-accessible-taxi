<?php
try{
	require_once("../connect_cfd101g2.php");
	$sql = "select * from program where program_status=1";
	$products = $pdo->query($sql);
	$prodRows = $products->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($prodRows);
}catch(PDOException $e){
	//echo $e->getMessage();
	exit("系統暫時不能提供服務");}