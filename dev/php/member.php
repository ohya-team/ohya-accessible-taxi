<?php
ob_start();
session_start();
try {
    require_once "../connect_cfd101g2.php";
    $memInfos =[];
    if (isset($_SESSION["mem_account"])) {
        $sql = "select * from member where mem_account=:mem_account and mem_password=:mem_password and mem_status ='1'";
        $member = $pdo->prepare($sql);
        $member->bindValue(":mem_account", $_SESSION["mem_account"]);
        $member->bindValue(":mem_password", $_SESSION["mem_password"]);
        $member->execute();
        $memInfos = $member->fetchAll(PDO::FETCH_ASSOC);
    }

    echo json_encode($memInfos);
} catch (PDOException $e) {
    echo $e->getMessage();
    exit("系統暫時不能提供服務");}
