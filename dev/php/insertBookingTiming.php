<?php
require_once "../connect_cfd101g2.php";

for($i=1; $i<11; $i++){
    $sql = "INSERT INTO `booking_timing`(`DRIVER_NO`, `BOOKING_DATE`, `BOOKING_MORNING`, `BOOKING_AFTERNOON`, `BOOKING_EVENING`) VALUES ($i,:insertDates,1,1,1)";
    $program = $pdo->prepare($sql);
    $program->bindValue(":insertDates", $_GET["insertDates"]);
    $program->execute();
}

header('Location:../admin/adminBookingTiming.html');
?>