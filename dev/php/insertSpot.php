<?php
require_once("../connect_cfd101g2.php");
$sql="insert into spot (spot_name,spot_cat,spot_info,spot_min_info,spot_slogan,spot_status,spot_status_s,spot_pic_1,spot_pic_2,spot_pic_3,spot_pic_4,spot_pic_b) values (:spot_name,:spot_cat,:spot_info,:spot_min_info,:spot_slogan,:spot_status,:spot_status_s,:spot_pic_1,:spot_pic_2,:spot_pic_3,:spot_pic_4,:spot_pic_b)";
$spot =$pdo->prepare($sql);

$picarr=['spot_pic_1','spot_pic_2','spot_pic_3','spot_pic_4','spot_pic_b'];
foreach($picarr as $value){
switch ($_FILES[$value]['error']) {
    case 0:
        $dir='../images/travel/spot/';
        $webdir='./images/travel/spot/';
        if(file_exists($dir)==false){
            mkdir($dir);
        }
        $from =$_FILES[$value]['tmp_name'];
        $to =$dir .$_FILES[$value]['name'];
        if(copy($from, $to)){
            $_POST["$value"]=  $webdir.$_FILES[$value]['name']; 
        }else{
            echo "上傳失敗<br>";
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
}
$spotArr=['spot_name','spot_cat','spot_info','spot_min_info','spot_slogan','spot_status','spot_status_s','spot_pic_1','spot_pic_2','spot_pic_3','spot_pic_4','spot_pic_b'];
foreach ($spotArr as  $value) {
    $spot->bindValue(":".$value,$_POST[$value]);
}
$spot->execute();
header('Location:../admin/adminSpot.html');
