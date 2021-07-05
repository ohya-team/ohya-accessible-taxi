<?php
try{
	require_once("../connect_cfd101g2.php");
	$sql = "select p1.*,p2.SPOT_NO from program p1  join program_item p2 where p1.PROGRAM_NO = p2.PROGRAM_NO";
	$products = $pdo->query($sql);
	$prodRows = $products->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($prodRows);
}catch(PDOException $e){
	//echo $e->getMessage();
	exit("系統暫時不能提供服務");}