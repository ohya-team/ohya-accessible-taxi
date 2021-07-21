<?php
try {
    require_once "../connect_cfd101g2.php";
    $sql = "SELECT * FROM `discount_cat` where DISCOUNT_RES = :DISCOUNT_RES" ;
    $data = json_decode(file_get_contents("php://input"), true);
    $products = $pdo->prepare($sql);
    $products->bindValue(':DISCOUNT_RES',$data['discount_res']);
    $products->execute();
    $memInfos = $products->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($memInfos);

} catch (PDOException $e) {
    //echo $e->getMessage();
    exit("系統暫時不能提供服務");}
