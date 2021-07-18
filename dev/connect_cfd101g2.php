<?php
try {
    $dbname = "tebamefe_cfd101g2";
/*上傳用帳密，本機開發時請更改為個人mysql帳密*/
    $user = "tibamefe_since2021";"root";
    $password = "vwRBSb.j&K#E";
    
    $dsn = "mysql:host=localhost;port=3306;dbname=$dbname;charset=utf8";
    $option=array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE=>PDO::CASE_NATURAL);
    $pdo = new PDO($dsn, $user, $password, $option); 
} catch (PDOException $e) {
    echo '錯誤行號:', $e->getLine(), '<br>';
    echo '錯誤訊息:', $e->getMessage(), '<br>';
}
?> 