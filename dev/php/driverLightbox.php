<?php
	$driverNo = $_REQUEST["DRIVER_NO"];
try{
	require_once("../connect_cfd101g2.php");
	$sql = "select * from driver d inner join car c on d.CAR_NO = c.CAR_NO where DRIVER_NO=".$driverNo ;
	$drivers = $pdo->query($sql);
  $driverRow = array();
	$driverInfos = $drivers->fetch(PDO::FETCH_ASSOC);
	echo json_encode($driverInfos);
}catch(PDOException $e){
	echo $e->getMessage();
	exit("系統暫時不能提供服務");}
?>