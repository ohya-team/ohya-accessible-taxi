<?php
//載入 db.php 檔案，讓我們可以透過它連接資料庫，因為此檔案放在 admin 裡，要找到 db.php 就要回上一層 ../php 裡面才能找到
require_once 'adminDb.php';

//如過有 $_SESSION['is_login'] 這個值，以及 $_SESSION['is_login'] 為 true 都代表已登入
if (isset($_SESSION['is_login']) && $_SESSION['is_login']) {
  //直接轉跳到 adminManage.php 後端首頁
  header("Location: adminManage.php");
}
?>

<!DOCTYPE html>
<html lang="zh-TW">

<head>
  <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="navbar-header">
      <a class="navbar-brand" href="adminManage.html"><img src="../images/logo/ohya_logo_main.svg" alt="Ohya"></a>
    </div>
  </nav>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <!-- 給行動裝置或平板顯示用，根據裝置寬度而定，初始放大比例 1 -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- 載入 bootstrap 的 css 方便我們快速設計網站-->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" />

  <!-- Bootstrap Core CSS -->
  <link href="../css/bootstrap.css" rel="stylesheet">

  <!-- MetisMenu CSS -->
  <link href="../css/metisMenuMin.css" rel="stylesheet">

  <!-- Timeline CSS -->
  <link href="../css/timeline.css" rel="stylesheet">

  <!-- Custom CSS -->
  <link href="../css/startmin.css" rel="stylesheet">

  <!-- Morris Charts CSS -->
  <link href="../css/morris.css" rel="stylesheet">

  <!-- Custom Fonts -->
  <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />


</head>

<body>

  <div class="container">
    <div class="row">
      <div class="col-md-4 col-md-offset-4">
        <div class="login-panel panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">管理員登入</h3>
          </div>
          <div class="panel-body">
            <!-- <form role="form">
              <fieldset>
                <div class="form-group">
                  <input class="form-control" placeholder="E-mail" name="email" type="email" autofocus>
                </div>
                <div class="form-group">
                  <input class="form-control" placeholder="Password" name="password" type="password" value="">
                </div>
                <div class="checkbox">
                  <label>
                    <input name="remember" type="checkbox" value="Remember Me">記住密碼
                  </label>
                </div>
                Change this to a button or input when using this as a form
                <a href="adminManage.html" class="btn btn-lg btn-success btn-block">登入</a>
              </fieldset>
            </form> -->
            <form class="login">
            <div class="form-group">
              <label for="username">帳號</label>
              <input type="text" class="form-control" id="username" name="username" placeholder="請輸入帳號" required>
            </div>
            <div class="form-group">
              <label for="password">密碼</label>
              <input type="password" class="form-control" id="password" name="password" placeholder="請輸入密碼" required>
            </div>
            <button type="submit" class="btn btn-lg btn-success btn-block">
              登入
            </button>
          </form>

          </div>
        </div>
      </div>
    </div>
  </div>


  <!-- 網站內容 -->
  <!-- <div class="content">
    <div class="container">
      建立第一個 row 空間，裡面準備放格線系統
      <div class="row">
        在 xs 尺寸，佔12格，可參考 http://getbootstrap.com/css/#grid 說明
        <div class="col-xs-12 col-sm-4 col-sm-offset-4">
          <form class="login">
            <div class="form-group">
              <label for="username">帳號</label>
              <input type="text" class="form-control" id="username" name="username" placeholder="請輸入帳號" required>
            </div>
            <div class="form-group">
              <label for="password">密碼</label>
              <input type="password" class="form-control" id="password" name="password" placeholder="請輸入密碼" required>
            </div>
            <button type="submit" class="btn btn-default">
              登入
            </button>
          </form>
        </div>
      </div>
    </div>
  </div> -->

  <!-- 在表單送出前，檢查確認密碼是否輸入一樣 -->
  <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
  <script>
    //當文件準備好時，
    $(document).on("ready", function() {
      //當表單 sumbit 出去的時候
      $("form.login").on("submit", function() {
        //使用 ajax 送出 帳密給 verify_user.php
        $.ajax({
          type: "POST",
          url: "adminVerifyUser.php", //因為此 login.php 是放在 admin 資料夾內，若要前往 php，就要回上一層 ../ 找到 php 才能進入 verify_user.php
          data: {
            un: $("#username").val(), //使用者帳號
            pw: $("#password").val() //使用者密碼
          },
          dataType: 'html' //設定該網頁回應的會是 html 格式
        }).done(function(data) {
          //成功的時候
          // console.log(data);
          if (data == "yes") {
            //註冊新增成功，轉跳到登入頁面。
            window.location.href = "adminManage.php"; //因為目前的 login.php 跟後端的 index.php 首頁在同一資料夾，所以直接叫他就好
          } else {
            alert("登入失敗，請確認帳號密碼");
          }

        }).fail(function(jqXHR, textStatus, errorThrown) {
          //失敗的時候
          alert("有錯誤產生，請看 console log");
          console.log(jqXHR.responseText);
        });
        //回傳 false 為了要阻止 from 繼續送出去。由上方ajax處理即可
        return false;
      });
    });
  </script>


  <!-- jQuery -->
  <script src="../js/jqueryMin.js"></script>

  <!-- Bootstrap Core JavaScript -->
  <script src="../js/bootstrapMin.js"></script>

  <!-- Metis Menu Plugin JavaScript -->
  <script src="../js/metisMenuMin.js"></script>

  <!-- Custom Theme JavaScript -->
  <script src="../js/startmin.js"></script>

</body>

</html>