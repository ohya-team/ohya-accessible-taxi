<?php
ob_start();
session_start();
try {
	require_once "../connect_cfd101g2.php";
	$sql = "UPDATE `member`set `MEM_LASTNAME`=:MEM_LASTNAME , `MEM_FIRSTNAME` = :MEM_FIRSTNAME , `MEM_PASSWORD` = :MEM_PASSWORD, `MEM_PHONE` = :MEM_PHONE , `MEM_PIC` = :MEM_PIC where `MEM_NO`= :MEM_NO";
	$memEd = $pdo->prepare($sql);

	switch($_FILES["MEM_PIC"]['error']){
		case 0:
				$dir = "../images/user/";
				$webdir='./images/user/';
				//---檢查資料夾或檔案是否存在
				if(file_exists($dir) == false){
					mkdir($dir); //make directory
				}
	
				$from = $_FILES["MEM_PIC"]['tmp_name'];
				$to = $dir . $_FILES["MEM_PIC"]['name']; //../images/smile.gif
				
				if (copy($from, $to)) {
					$_POST["MEM_PIC"] = $webdir.$_FILES["MEM_PIC"]['name'];
					echo "<script>alert('上傳成功')</script><br>";
				} else {
					echo "<script>alert('上傳失敗')</script><br>";
				}
				break;

		case 1:
				echo "上傳檔案太大, 檔案不得超過", ini_get("upload_max_filesize") ,"<br>";
				break;
		case 2:
				echo "上傳檔案太大, 檔案不得超過", $_POST["MAX_FILE_SIZE"] ,"<br>";
				break;
		case 3:
				echo "上傳檔案, 不完整, 稍後再試~<br>";
				break;
		case 4:
				echo "未選檔案~<br>";
				break;
		default:
				echo "系統暫時無法提供服務~~";
	}

	$memEd->bindValue(":MEM_NO", $_POST["MEM_NO"]); 
	$memEd->bindValue(":MEM_LASTNAME", $_POST["MEM_LASTNAME"]);    
	$memEd->bindValue(":MEM_FIRSTNAME", $_POST["MEM_FIRSTNAME"]);  
	$memEd->bindValue(":MEM_PASSWORD", $_POST["MEM_PASSWORD"]);
	$memEd->bindValue(":MEM_PHONE", $_POST["MEM_PHONE"]);
	$memEd->bindValue(":MEM_PIC", $_POST["MEM_PIC"]);

	$memEd->execute();

	echo "<script>alert('異動成功~');history.go(-2);</script>";


} catch (PDOException $e) {
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "<script>alert('系統暫時不能正常運行，請稍後再試');</script>";	
	exit("end---"); //php停止執行, 並輸出訊息
}
 
 ?>