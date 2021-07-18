<?php
try{
	require_once("../connect_cfd101g2.php");
	$sql = "SELECT b.SCH_NO, b.BOOKING_DATE, b.BOOKING_MORNING, b.BOOKING_AFTERNOON, b.BOOKING_EVENING, c.CAR_NO, c.CAR_TYPE, c.CAR_DESCRIBE, c.CAR_PIC, d.DRIVER_NO, d.DRIVER_NAME, d.DRIVER_PIC\n"

    . "FROM booking_timing b NATURAL JOIN driver d NATURAL JOIN car c\n"

    . "where b.BOOKING_DATE between curdate()+7 and curdate()+13;";
    // . "where (b.BOOKING_DATE between curdate()+7 and curdate()+13) and (b.BOOKING_MORNING = 1 or b.BOOKING_AFTERNOON = 1 or b.BOOKING_EVENING = 1);";
	$timingDriverCar = $pdo->query($sql);
	$bookingInfo = $timingDriverCar->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($bookingInfo);
}catch(PDOException $e){
	//echo $e->getMessage();
	exit("系統暫時不能提供服務");}
?>