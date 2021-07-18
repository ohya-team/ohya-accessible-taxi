<?php
try{
	require_once("../connect_cfd101g2.php");
  $sql = "SELECT t1.*,d3.DISCOUNT_INFO,d3.DISCOUNT_PER FROM (select t.* ,p.PROGRAM_NAME,p.PROGRAM_PRICE,c.CAR_TYPE from travel_order t join  program p join car c where t.PROGRAM_NO = p.PROGRAM_NO and p.CAR_NO = c.CAR_NO)t1 JOIN (SELECT d1.DISCOUNT_NUM,d2.* from discount d1 join discount_cat d2 WHERE d1.DISCOUNT_RES=d2.DISCOUNT_RES ) d3 WHERE t1.DISCOUNT_NUM = d3.DISCOUNT_NUM   by `ORDER_AT` desc";
	$products = $pdo->query($sql);
	$prodRows = $products->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($prodRows);
}catch(PDOException $e){
	//echo $e->getMessage();
	exit("系統暫時不能提供服務");}