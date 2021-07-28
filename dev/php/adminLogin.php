<?php
ob_start();
session_start();
try {
    require_once "../connect_cfd101g2.php";

        $sql = "select * from admin where ADMIN_ID=:admin_id and ADMIN_PW=:admin_pw ";
        $admin = $pdo->prepare($sql);
        $admin->bindValue(":admin_id", $_POST["admin_id"]);
        $admin->bindValue(":admin_pw", $_POST["admin_pw"]);
        $admin->execute();
				
				if( $admin -> rowCount() == 0){
					echo "<script>alert('帳號密碼錯誤~');history.go(-1)</script>";
				}else{
					$adminRow = $admin->fetch(PDO::FETCH_ASSOC);
					$_SESSION["admin_id"] = $adminRow["ADMIN_ID"];
					$_SESSION["admin_pw"] = $adminRow["ADMIN_PW"];
					$result = ["admin_id"=>$_SESSION["admin_id"], "admin_pw"=>$_SESSION["admin_pw"]];
					echo  json_encode($result);
					echo "<script>alert('登入成功~')</script>";
					header('Location:../admin/adminManage.html'); 
				}


} catch (PDOException $e) {
    echo $e->getMessage();
    exit("系統暫時不能提供服務");}
