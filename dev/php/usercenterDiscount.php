<?php
try{
	require_once("../connect_cfd101g2.php");
    $sql = "SELECT * FROM `discount`d1 JOIN discount_cat d2 ON d1.DISCOUNT_RES = d2.DISCOUNT_RES";
	$discount = $pdo->query($sql);
	$discountInfo = $discount->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($discountInfo);
}catch(PDOException $e){
	//echo $e->getMessage();
	exit("系統暫時不能提供服務");
}
?>