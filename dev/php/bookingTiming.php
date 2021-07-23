<?php
try{
	require_once("../connect_cfd101g2.php");
	$sql = "select * from booking_timing";
	$tbInfo = $pdo->query($sql);
	$bookingTiming = $tbInfo->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($bookingTiming);
}catch(PDOException $e){
	exit("系統暫時不能提供服務");}
?>