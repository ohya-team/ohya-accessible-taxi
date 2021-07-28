<?php
ob_start();
session_start();
try {
    require_once "../connect_cfd101g2.php";

        $sql = "select * from admin where admin_id=:admin_id and admin_pw=:admin_pw";
        $admin = $pdo->prepare($sql);
        $admin->bindValue(":admin_id", $_SESSION["admin_id"]);
        $admin->bindValue(":admin_pw", $_SESSION["admin_pw"]);
        $admin->execute();
        $adminInfos = $admin->fetchAll(PDO::FETCH_ASSOC);


    echo json_encode($adminInfos);
} catch (PDOException $e) {
    echo $e->getMessage();
    exit("系統暫時不能提供服務");}