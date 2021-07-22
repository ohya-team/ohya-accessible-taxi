<?php
try {
    require_once "../connect_cfd101g2.php";
    $sql = "UPDATE `art_rep` SET `REP_STATUS`= :rep_status WHERE REP_NO = :rep_no";
    $order = $pdo->prepare($sql);
    $data = json_decode(file_get_contents("php://input"), true);
    $order->bindValue(':rep_status', $data['rep_status']);
    $order->bindValue(':rep_no', $data['rep_no']);
    $order->execute();

} catch (PDOException $e) {
    //echo $e->getMessage();
    exit("系統暫時不能提供服務");
}
try {
    require_once "../connect_cfd101g2.php";
    $sql = "UPDATE `art` SET `ART_STATUS`= :art_status WHERE ART_NO = :art_no";
    $order = $pdo->prepare($sql);
    $data = json_decode(file_get_contents("php://input"), true);
    $order->bindValue(':art_status', $data['art_status']);
    $order->bindValue(':art_no', $data['art_no']);
    $order->execute();

} catch (PDOException $e) {
    //echo $e->getMessage();
    exit("系統暫時不能提供服務");
}
