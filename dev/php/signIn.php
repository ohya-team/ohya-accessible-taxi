<?php
ob_start();
session_start();
try{
	require_once("../connect_cfd101g2.php");
	$sql = "INSERT INTO member ( `MEM_LASTNAME`, `MEM_FIRSTNAME`, `MEM_ACCOUNT`, `MEM_PASSWORD`,`MEM_PHONE`, `MEM_STATUS`) VALUES (:mem_lastname,:mem_firstname,:mem_account,:mem_password,:mem_phone,1)";
	$member = $pdo->prepare($sql);
  $memArr = ['mem_lastname', 'mem_firstname', 'mem_account', 'mem_password','mem_phone'];
  foreach ($memArr as  $value) {
    $member->bindValue(":".$value,$_POST[$value]);
  }
  $member -> execute();
  echo "<script>alert('註冊成功~')</script>";

  $_SESSION["mem_account"] = $_POST["mem_account"];
  $_SESSION["mem_lastname"] = $_POST["mem_lastname"];
  $_SESSION["mem_firstname"] = $_POST["mem_firstname"];
  $_SESSION["mem_password"] = $_POST["mem_password"];
  $_SESSION["mem_phone"] = $_POST["mem_phone"];

}catch(PDOException $e){
	echo $e->getMessage();
	exit("系統暫時不能提供服務");
}
header('Location:../usercenter.html');  

?>