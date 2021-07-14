<?php
// ob_start();
// session_start(); 
try {
	require_once("../connect_cfd101g2.php");
	$sql = "UPDATE `member` 
					set `MEM_LASTNAME`=:MEM_LASTNAME , `MEM_FIRSTNAME` = :MEM_FIRSTNAME , `MEM_PASSWORD` = :MEM_PASSWORD, `MEM_PHONE` = :MEM_PHONE 
	                where `MEM_NO`= :MEM_NO";
	 $memEd = $pdo->prepare($sql) ;    
	 $memEd->bindValue(":MEM_NO", $_POST["MEM_NO"]); 
	 $memEd->bindValue(":MEM_LASTNAME", $_POST["MEM_LASTNAME"]);    
	 $memEd->bindValue(":MEM_FIRSTNAME", $_POST["MEM_FIRSTNAME"]);  
	 $memEd->bindValue(":MEM_PASSWORD", $_POST["MEM_PASSWORD"]);
	 $memEd->bindValue(":MEM_PHONE", $_POST["MEM_PHONE"]);
	//  $memEd->bindValue(":MEM_PIC", $_POST["MEM_PIC"]);  
	 $memEd->execute();

	echo "<script>alert('異動成功~');history.go(-2);</script>";


} catch (PDOException $e) {
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "<script>alert('系統暫時不能正常運行，請稍後再試');</script>";	
	// exit("end---"); //php停止執行, 並輸出訊息
}
 
 ?>