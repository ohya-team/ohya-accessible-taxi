<?php
try {
	require_once "../connect_cfd101g2.php";
	$sql = "UPDATE `driver`set `DRIVER_NAME`=:DRIVER_NAME , `DRIVER_PHONE` = :DRIVER_PHONE , `DRIVER_DESCRIBE` = :DRIVER_DESCRIBE, `DRIVER_PIC` = :DRIVER_PIC ,  `TAXI_LICENCENO` = :TAXI_LICENCENO , `TAXI_DESCRIBE` = :TAXI_DESCRIBE , `TAXI_PIC` = :TAXI_PIC where `DRIVER_NO`= :DRIVER_NO";
	$driverEd = $pdo->prepare($sql);

	$uploadArr = [];
	$DefaultUploadArr = ["DRIVER_PIC", "TAXI_PIC"];
	foreach ($DefaultUploadArr as $value) {
			if ($_FILES[$value]['error'] == 0) {
					$uploadArr[] = $value;
			}
	}

	foreach ($uploadArr as $value) {
		switch($_FILES[$value]['error']){
			case UPLOAD_ERR_OK:
					$dir = "../images/driver/";
					$webdir='./images/driver/';
					//---檢查資料夾或檔案是否存在
					if(file_exists($dir) == false){
						mkdir($dir); //make directory
					}
		
					$from = $_FILES[$value]['tmp_name'];
					$to = $dir . $_FILES[$value]['name']; 
					
					if (copy($from, $to)) {
						$_POST["$value"] = $webdir . $_FILES[$value]['name'];
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
	}

	$driverEd->bindValue(":DRIVER_NO", $_POST["DRIVER_NO"]); 
	$driverEd->bindValue(":DRIVER_NAME", $_POST["DRIVER_NAME"]);    
	$driverEd->bindValue(":DRIVER_PHONE", $_POST["DRIVER_PHONE"]);  
	$driverEd->bindValue(":DRIVER_DESCRIBE", $_POST["DRIVER_DESCRIBE"]);  
	$driverEd->bindValue(":DRIVER_PIC", $_POST["DRIVER_PIC"]);
	$driverEd->bindValue(":TAXI_LICENCENO", $_POST["TAXI_LICENCENO"]);
	$driverEd->bindValue(":TAXI_DESCRIBE", $_POST["TAXI_DESCRIBE"]);
	$driverEd->bindValue(":TAXI_PIC", $_POST["TAXI_PIC"]);

	$driverEd->execute();
	echo "<script>alert('異動成功~');</script>";
	header('Location:../admin/adminServiceDriver.html');


} catch (PDOException $e) {
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "<script>alert('系統暫時不能正常運行，請稍後再試');history.go(-1)</script>";	
	//exit("end---"); //php停止執行, 並輸出訊息
}
 
 ?>