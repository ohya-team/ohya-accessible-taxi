<?php
require_once "../connect_cfd101g2.php";

foreach($_POST as $k=>$v){
    list($schNo, $t) = explode("_", $k);

    $morning = 0;
    $afternoon = 0;
    $evening = 0;

    if($t==0){
        $morning+=$v;

        $sql = "UPDATE `booking_timing` SET `BOOKING_MORNING`=:morning WHERE `SCH_NO`=$schNo;";
        $program = $pdo->prepare($sql);
        $program->bindValue(":morning", $morning);
        
        $program->execute();
    }else if($t==1){
        $afternoon +=$v;

        $sql = "UPDATE `booking_timing` SET `BOOKING_AFTERNOON`=:afternoon WHERE `SCH_NO`=$schNo;";
        $program = $pdo->prepare($sql);
        $program->bindValue(":afternoon", $afternoon);
        
        $program->execute();
    }else if($t==2){
        $evening +=$v;

        $sql = "UPDATE `booking_timing` SET `BOOKING_EVENING`=:evening WHERE `SCH_NO`=$schNo;";
        $program = $pdo->prepare($sql);
        $program->bindValue(":evening", $evening);
        
        $program->execute();
    }
}


header('Location:../admin/admindriversRosterTable.html');
?>