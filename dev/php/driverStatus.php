<?php
try {
    require_once "../connect_cfd101g2.php";
    $sql = "UPDATE `driver` SET `DRIVER_STATUS`=:DRIVER_STATUS WHERE DRIVER_NO =:DRIVER_NO";
    $memberST = $pdo->prepare($sql);
    $data = json_decode(file_get_contents("php://input"), true);

    $memberST->bindValue(':DRIVER_NO', $data['driverNo']);
    $memberST->bindValue(':DRIVER_STATUS', $data['driverStatus']);
    $memberST->execute();
    header('Location:../admin/adminMember.html');

} catch (PDOException $e) {
    //echo $e->getMessage();
    exit("系統暫時不能提供服務");
}
