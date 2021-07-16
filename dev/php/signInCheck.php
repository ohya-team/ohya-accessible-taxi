<?php
try{
	require_once("../connect_cfd101g2.php");
	$sql = "select * from member where mem_account=?";
	$member = $pdo->prepare($sql);
	$member -> bindValue(1, $_POST["mem_account"]);
	$member -> execute();

	if( $member -> rowCount() !=0){
		echo "此帳號已存在, 不可使用";
  }else{ //此帳號可使用
    //echo "此帳號可以使用";
	}
}catch(PDOException $e){
	echo $e->getMessage();
	exit("系統暫時不能提供服務");}
?>