<?php
try{
	require_once("../connect_cfd101g2.php");
	$sql = "SELECT d.* ,d2.DISCOUNT_INFO, d2.DISCOUNT_INFO FROM `discount` d JOIN discount_cat d2 ON d.DISCOUNT_RES = d2.DISCOUNT_RES ORDER BY d.DISCOUNT_STATUS";
	$discount = $pdo->query($sql);
	$discountInfo = $discount->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($discountInfo);
}catch(PDOException $e){
	//echo $e->getMessage();
	exit("系統暫時不能提供服務");
}
?>