<?php
require_once "../connect_cfd101g2.php";
$sql = "UPDATE `program` SET `PROGRAM_NAME`=:program_name,`CAR_NO`=:car_no,`PROGRAM_STATUS`=:program_status,`PROGRAM_STATUS_S`=:program_status_s,`PROGRAM_STATUS_S_M`=:program_status_s_m,`PROGRAM_RATING`=:program_rating,`PROGRAM_FEATURE_1`=:program_feature_1,PROGRAM_FEATURE_2=:program_feature_2,PROGRAM_FEATURE_3=:program_feature_3,PROGRAM_REMARKS=:program_remarks,PROGRAM_PRICE=:program_price,PROGRAM_PIC=:program_pic WHERE PROGRAM_NO = :program_no";
$program = $pdo->prepare($sql);
$program->bindValue(":program_no", $_POST["program_no"]);
$program->bindValue(":program_name", $_POST["program_name"]);
$program->bindValue(":car_no", $_POST["car_no"]);
$program->bindValue(":program_status", $_POST["program_status"]);
$program->bindValue(":program_status_s", $_POST["program_status_s"]);
$program->bindValue(":program_status_s_m", $_POST["program_status_s_m"]);
$program->bindValue(":program_rating", $_POST["program_rating"]);
$program->bindValue(":program_feature_1", $_POST["program_feature_1"]);
$program->bindValue(":program_feature_2", $_POST["program_feature_2"]);
$program->bindValue(":program_feature_3", $_POST["program_feature_3"]);
$program->bindValue(":program_remarks", $_POST["program_remarks"]);
$program->bindValue(":program_price", $_POST["program_price"]);
$uploadArr = [];

if ($_FILES['program_pic']['error'] == 0) {
    switch ($_FILES['program_pic']['error']) {
        case 0:
            $dir = '../images/travel/program/';
            $webdir = './images/travel/program/';
            if (file_exists($dir) == false) {
                mkdir($dir);
            }
            $from = $_FILES['program_pic']['tmp_name'];
            $to = $dir . $_FILES['program_pic']['name'];
            if (copy($from, $to)) {
                $_POST["program_pic"] = $webdir . $_FILES['program_pic']['name'];
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

$program->bindValue(":program_pic", $_POST["program_pic"]);
$program->execute();

$sql = "delete from program_item WHERE PROGRAM_NO = :program_no";
$deleteSpot = $pdo->prepare($sql);
$deleteSpot->bindValue(":program_no", $_POST["program_no"]);
$deleteSpot->execute();

for ($i = 0; $i < count($_POST["spot"]); $i++) {
    $sql = "INSERT INTO `program_item`(PROGRAM_NO,SPOT_NO) values (:program_no,:spot)";
    $spot = $pdo->prepare($sql);
    $spot->bindValue(":program_no", $_POST["program_no"]);
    $spot->bindValue(":spot", $_POST["spot"][$i]);
    $spot->execute();
}

if (count($_POST["newSpot"]) > 0) {
    for ($i = 0; $i < count($_POST["newSpot"]); $i++) {
        $sql = "INSERT INTO `program_item`(PROGRAM_NO,SPOT_NO) values (:program_no,:spot)";
        $newspot = $pdo->prepare($sql);
        $newspot->bindValue(":program_no", $_POST["program_no"]);
        $newspot->bindValue(":spot", $_POST["newSpot"][$i]);
        $newspot->execute();
    }
}

header('Location:../admin/adminProgram.html');
