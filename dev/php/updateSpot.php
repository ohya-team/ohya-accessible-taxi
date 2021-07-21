<?php
require_once "../connect_cfd101g2.php";
$sql = "UPDATE `spot` SET `SPOT_NAME`=:spot_name,`SPOT_CAT`=:spot_cat,`SPOT_INFO`=:spot_info,`SPOT_MIN_INFO`=:spot_min_info,`SPOT_SLOGAN`=:spot_slogan,`SPOT_STATUS`=:spot_status,`SPOT_STATUS_S`=:spot_status_s,spot_pic_1=:spot_pic_1,spot_pic_2=:spot_pic_2,spot_pic_3=:spot_pic_3,spot_pic_4=:spot_pic_4,spot_pic_b=:spot_pic_b WHERE SPOT_NO = :spot_no";
$spot = $pdo->prepare($sql);

$uploadArr = [];
$DefaultUploadArr = ["spot_pic_1", "spot_pic_2", "spot_pic_3", "spot_pic_4", "spot_pic_b"];
foreach ($DefaultUploadArr as $value) {
    if ($_FILES[$value]['error'] == 0) {
        $uploadArr[] = $value;
    }
}
foreach ($uploadArr as $value) {
    switch ($_FILES[$value]['error']) {
        case 0:
            $dir = '../images/travel/spot/';
            $webdir = './images/travel/spot/';
            if (file_exists($dir) == false) {
                mkdir($dir);
            }
            $from = $_FILES[$value]['tmp_name'];
            $to = $dir . $_FILES[$value]['name'];
            if (copy($from, $to)) {
                $_POST["$value"] = $webdir . $_FILES[$value]['name'];
            } else {
                echo "上傳失敗<br>";
            }
            break;

        case 1:
            echo "上傳檔案太大, 檔案不得超過", ini_get("upload_max_filesize"), "<br>";
            break;
        case 2:
            echo "上傳檔案太大, 檔案不得超過", $_POST["MAX_FILE_SIZE"], "<br>";
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
}
$spotArr = ['spot_no', 'spot_name', 'spot_cat', 'spot_info', 'spot_min_info', 'spot_slogan', 'spot_status', 'spot_status_s', 'spot_status_s', 'spot_pic_1', 'spot_pic_2', 'spot_pic_3', 'spot_pic_4', 'spot_pic_b'];
foreach ($spotArr as $value) {
    $spot->bindValue(":" . $value, $_POST[$value]);
}
$spot->execute();
header('Location:../admin/adminSpot.html');
