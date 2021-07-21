<?php
try{
	require_once("../connect_cfd101g2.php");
	$sql = "select s.*,p.PROGRAM_NO,p.PROGRAM_INFO_1,p.PROGRAM_INFO_2 from spot s  join program_item p where s.SPOT_NO = p.SPOT_NO";
	$products = $pdo->query($sql);
	$prodRows = $products->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($prodRows);
}catch(PDOException $e){
	//echo $e->getMessage();
	exit("系統暫時不能提供服務");}