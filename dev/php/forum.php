<?php
try{
	require_once("../connect_cfd101g2.php");
	$sql = "SELECT a.*,m.MEM_FIRSTNAME,m.MEM_PIC FROM art a JOIN member m ON a.MEM_NO = m.MEM_NO WHERE ART_STATUS = 0";
	$products = $pdo->query($sql);
	$artInfos = $products->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($artInfos);
}catch(PDOException $e){
	//echo $e->getMessage();
	exit("系統暫時不能提供服務");}
	?>