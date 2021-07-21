<?php
try {
    require_once "../connect_cfd101g2.php";
    $sql = "UPDATE `member` SET `MEM_STATUS`=:MEM_STATUS WHERE MEM_NO =:MEM_NO";
    $memberST = $pdo->prepare($sql);
    $data = json_decode(file_get_contents("php://input"), true);

    $memberST->bindValue(':MEM_NO', $data['memNo']);
    $memberST->bindValue(':MEM_STATUS', $data['memStatus']);
    $memberST->execute();
    header('Location:../admin/adminMember.html');

} catch (PDOException $e) {
    //echo $e->getMessage();
    exit("系統暫時不能提供服務");
}
