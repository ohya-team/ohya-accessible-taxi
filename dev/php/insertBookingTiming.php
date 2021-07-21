<?php
require_once "../connect_cfd101g2.php";

for($days=1; $days<=$_GET["insertDates"]; $days++){
    for($i=1; $i<12; $i++){//i是司機人數
        $sql = "INSERT INTO `booking_timing`(`DRIVER_NO`, `BOOKING_DATE`, `BOOKING_MORNING`, `BOOKING_AFTERNOON`, `BOOKING_EVENING`)\n"

    . "VALUES ($i,adddate((SELECT c.BOOKING_DATE\n"

    . "                   FROM booking_timing c\n"

    . "                   WHERE c.SCH_NO = (SELECT b.SCH_NO\n"

    . "                                     FROM booking_timing b\n"

    . "                                     ORDER by b.SCH_NO DESC LIMIT 1)-10),1),1,1,1);";
        $program = $pdo->prepare($sql);
        $program->execute();
    }
}

header('Location:../admin/adminBookingTiming.html');
?>