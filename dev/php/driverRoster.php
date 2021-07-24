<?php
try{
	require_once("../connect_cfd101g2.php");
	$sql = "SELECT b.SCH_NO, b.BOOKING_DATE, b.BOOKING_MORNING, b.BOOKING_AFTERNOON, b.BOOKING_EVENING, d.DRIVER_NO, d.DRIVER_NAME\n"

    . "FROM booking_timing b NATURAL JOIN driver d\n"
    . "WHERE month(b.BOOKING_DATE)=month(CURRENT_DATE)+1;";
	$tbInfo = $pdo->query($sql);
	$driverRoster = $tbInfo->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($driverRoster);
}catch(PDOException $e){
	exit("系統暫時不能提供服務");}
?>