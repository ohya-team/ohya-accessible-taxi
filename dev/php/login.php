<?php
ob_start();
session_start();
try{
	require_once("../connect_cfd101g2.php");
	$sql = "select * from member where mem_account=:mem_account and mem_password=:mem_password";
	$member = $pdo->prepare($sql);
	$member -> bindValue(":mem_account" , $_POST["mem_account"]);
	$member -> bindValue(":mem_password" , $_POST["mem_password"]);
  $member -> execute();

  if( $member -> rowCount() == 0){
    echo "<script>alert('帳號密碼錯誤~');history.go(-1)</script>";
  }else{
    $memRow = $member->fetch(PDO::FETCH_ASSOC);
    $_SESSION["mem_account"] = $memRow["MEM_ACCOUNT"];
    $_SESSION["mem_password"] = $memRow["MEM_PASSWORD"];
    $result = ["mem_account"=>$_SESSION["mem_account"], "mem_password"=>$_SESSION["mem_password"]];
    echo  json_encode($result);
    
  }
  
  echo "<script>alert('登入成功~')</script>";
}catch(PDOException $e){
	echo $e->getMessage();
	exit("系統暫時不能提供服務");
}
header('Location:../index.html');  
?>

