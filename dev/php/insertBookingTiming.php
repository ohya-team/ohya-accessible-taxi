<?php
require_once "../connect_cfd101g2.php";

for($days=1; $days<=$_GET["insertDates"]; $days++){
    for($i=1; $i<12; $i++){//i是司機人數
        $sql = "INSERT INTO `booking_timing`(`DRIVER_NO`, `BOOKING_DATE`, `BOOKING_MORNING`, `BOOKING_AFTERNOON`, `BOOKING_EVENING`) VALUES ($i,adddate(curdate(),$days),1,1,1);";
        $program = $pdo->prepare($sql);
        $program->execute();
    }
}

header('Location:../admin/adminBookingTiming.html');
?>