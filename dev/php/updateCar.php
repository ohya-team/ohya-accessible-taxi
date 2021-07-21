<?php
try {
	require_once "../connect_cfd101g2.php";
	$sql = "UPDATE `car`set `CAR_TYPE`=:CAR_TYPE , `CAR_MAXNUM` = :CAR_MAXNUM , `CAR_DESCRIBE` = :CAR_DESCRIBE, `CAR_PIC` = :CAR_PIC , `CAR_STATUS` = :CAR_STATUS where `CAR_NO`= :CAR_NO";
	$carEd = $pdo->prepare($sql);

	switch($_FILES["CAR_PIC"]['error']){
		case UPLOAD_ERR_OK:
				$dir = "../images/car/";
				$webdir='./images/car/';
				//---檢查資料夾或檔案是否存在
				if(file_exists($dir) == false){
					mkdir($dir); //make directory
				}
	
				$from = $_FILES["CAR_PIC"]['tmp_name'];
				$to = $dir . $_FILES["CAR_PIC"]['name']; //../images/smile.gif
				
				if (copy($from, $to)) {
					$_POST["CAR_PIC"] = $webdir.$_FILES["CAR_PIC"]['name'];
					// echo "<script>alert('上傳成功')</script><br>";
				} else {
					echo "<script>alert('上傳失敗')</script><br>";
				}
				break;

		case UPLOAD_ERR_INI_SIZE:
				echo "上傳檔案太大, 檔案不得超過", ini_get("upload_max_filesize") ,"<br>";
				break;
		case UPLOAD_ERR_FORM_SIZE:
				echo "上傳檔案太大, 檔案不得超過", $_POST["MAX_FILE_SIZE"] ,"<br>";
				break;
		case UPLOAD_ERR_PARTIAL:
				echo "上傳檔案, 不完整, 稍後再試~<br>";
				break;
		case UPLOAD_ERR_NO_FILE:
				echo "未選檔案~<br>";
				break;
		default:
				echo "系統暫時無法提供服務~~";
	}

	$carEd->bindValue(":CAR_NO", $_POST["CAR_NO"]); 
	$carEd->bindValue(":CAR_TYPE", $_POST["CAR_TYPE"]);    
	$carEd->bindValue(":CAR_MAXNUM", $_POST["CAR_MAXNUM"]);  
	$carEd->bindValue(":CAR_DESCRIBE", $_POST["CAR_DESCRIBE"]);
	$carEd->bindValue(":CAR_PIC", $_POST["CAR_PIC"]);
	$carEd->bindValue(":CAR_STATUS", $_POST["CAR_STATUS"]);

	$carEd->execute();

	echo "<script>alert('異動成功~');</script>";
  header('Location:../admin/adminServiceCar.html');


} catch (PDOException $e) {
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "<script>alert('系統暫時不能正常運行，請稍後再試')</script>";	
	//exit("end---"); //php停止執行, 並輸出訊息
}
 
 ?>