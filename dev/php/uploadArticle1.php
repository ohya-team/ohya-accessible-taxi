<?php
require_once("../connect_cfd101g2.php");
$sql="insert into art (mem_no,art_cat,art_click,art_title,art_content,art_status,art_img) values (:mem_no,:art_cat,0,:art_title,:art_content,0,:art_img)";
$art = $pdo->prepare($sql);
$art->bindValue(":art_cat",$_POST["art_cat"]);
$art->bindValue(":art_title",$_POST["art_title"]);
$art->bindValue(":art_content",$_POST["art_content"]);
$art->bindValue(":mem_no",$_POST["mem_no"]);
$pic="art_img";

switch ($_FILES[$pic]['error']) {
    case 0:
        $dir='../images/forum';
        $webdir='./images/forum';
        if(file_exists($dir)==false){
            mkdir($dir);
        }
        $from =$_FILES[$pic]['tmp_name'];
        $to =$dir .$_FILES[$pic]['name'];
        if(copy($from, $to)){
            $_POST["$pic"]=  $webdir.$_FILES[$pic]['name']; 
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

$art->bindValue(":art_img",$_POST["art_img"]);
$art->execute();
header('Location:../uploadArticleSuccess.html');
echo 1;
?>
