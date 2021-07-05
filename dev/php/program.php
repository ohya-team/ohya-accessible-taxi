<?php
try{
	require_once("../connect_cfd101g2.php");
	$sql = "select p.*,c.CAR_TYPE,c.CAR_MAXNUM from program p  join car c where p.car_no = c.car_no";
	$products = $pdo->query($sql);
	$prodRows = $products->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($prodRows);
}catch(PDOException $e){
	//echo $e->getMessage();
	exit("系統暫時不能提供服務");}