<?php
try{
	require_once("../connect_cfd101g2.php");
	$sql = "SELECT * FROM `discount_cat` WHERE NOT DISCOUNT_PER = 1";
	$discount = $pdo->query($sql);
	$discountInfos = $discount->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($discountInfos);
}catch(PDOException $e){
	//echo $e->getMessage();
	exit("系統暫時不能提供服務");}
	?>