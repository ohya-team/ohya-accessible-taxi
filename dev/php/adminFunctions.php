<?php

//啟動 session ，這樣才能夠取用 $_SESSION['link'] 的連線，做為資料庫的連線用
@session_start();

/**
 * 檢查資料庫有無該使用者名稱
 */
function adminVerifyUser($username, $password)
{
  //宣告要回傳的結果
  $result = null;
  //先把密碼用md5加密
  // $password = md5($password);
  //將查詢語法當成字串，記錄在$sql變數中
  $sql = "SELECT * FROM `admin` WHERE `admin_id` = '{$username}' AND `admin_pw` = '{$password}'";

  //用 mysqli_query 方法取執行請求（也就是sql語法），請求後的結果存在 $query 變數中
  $query = mysqli_query($_SESSION['link'], $sql);

  //如果請求成功
  if ($query)
  {
    //使用 mysqli_num_rows 回傳 $query 請求的結果數量有幾筆，為一筆代表找到會員且密碼正確。
    if(mysqli_num_rows($query) >= 1)
    {
      //取得使用者資料
      $user = mysqli_fetch_assoc($query);
      
      //在session李設定 is_login 並給 true 值，代表已經登入
      $_SESSION['is_login'] = true;
      //紀錄登入者的id，之後若要隨時取得使用者資料時，可以透過 $_SESSION['login_user_id'] 取用
      $_SESSION['login_user_id'] = $user['ADMIN_ID'];
       
      //回傳的 $result 就給 true 代表驗證成功
      $result = true;
    }
  }
  else
  {
    echo "{$sql} 語法執行失敗，錯誤訊息：" . mysqli_error($_SESSION['link']);
  }

  //回傳結果
  return $result;
}

?>