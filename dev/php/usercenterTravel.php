<?php
try{
	require_once("../connect_cfd101g2.php");
  $sql = "select t.* ,p.PROGRAM_NAME,p.PROGRAM_PIC,c.CAR_TYPE from travel_order t join  program p join car c where t.PROGRAM_NO = p.PROGRAM_NO and p.CAR_NO = c.CAR_NO order by `ORDER_AT` desc";
	$products = $pdo->query($sql);
	$prodRows = $products->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($prodRows);
}catch(PDOException $e){
	//echo $e->getMessage();
	exit("系統暫時不能提供服務");}