<?php
try {
    require_once "../connect_cfd101g2.php";
    $sql = "UPDATE `travel_order` SET `ORDER_STATUS`=:orderStatus WHERE order_no =:orderNo";
    $order = $pdo->prepare($sql);
    $data = json_decode(file_get_contents("php://input"), true);
    $order->bindValue(':orderNo', $data['orderNo']);
    $order->bindValue(':orderStatus', $data['orderStatus']);
    $order->execute();

} catch (PDOException $e) {
    //echo $e->getMessage();
    exit("系統暫時不能提供服務");
}
