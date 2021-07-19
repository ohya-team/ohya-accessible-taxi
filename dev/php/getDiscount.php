<?php
try {
    require_once "../connect_cfd101g2.php";
    $sql = "SELECT d1.*,d2.DISCOUNT_PER,d2.DISCOUNT_INFO FROM `discount` d1 JOIN discount_cat d2 WHERE d1.DISCOUNT_RES = d2.DISCOUNT_RES and d1.DISCOUNT_STATUS =0";
    $products = $pdo->query($sql);
    $prodRows = $products->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($prodRows);
} catch (PDOException $e) {
    //echo $e->getMessage();
    exit("系統暫時不能提供服務");}
