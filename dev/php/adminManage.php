<?php
//載入 db.php 檔案，讓我們可以透過它連接資料庫，另外後台都會用 session 判別暫存資料，所以要請求 db.php 因為該檔案最上方有啟動session_start()。
require_once 'adminDb.php';
require_once '../connect_cfd101g2.php';

//print_r($_SESSION); //查看目前session內容

//如過沒有 $_SESSION['is_login'] 這個值，或者 $_SESSION['is_login'] 為 false 都代表沒登入
//if (!isset($_SESSION['is_login']) || !$_SESSION['is_login']) {
  //直接轉跳到 login.php
  //header("Location: adminLogin.php");
//}
?>

<!DOCTYPE html>
<html lang="zh-TW">

<head>
  <title>後台管理員</title>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <!-- 給行動裝置或平板顯示用，根據裝置寬度而定，初始放大比例 1 -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- 載入 bootstrap 的 css 方便我們快速設計網站-->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" />
  <!-- <link rel="stylesheet" href="../css/style.css" />
  <link rel="shortcut icon" href="../images/favicon.ico"> -->

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

  <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>

    <script>
      $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
        var actions = $("table td:last-child").html();
        // Append table with add row form on add new button click
        $(".add-new").click(function () {
          $(this).attr("disabled", "disabled");
          var index = $("table tbody tr:last-child").index();
          var row = '<tr>' +
            '<td><input type="text" class="form-control" name="name" id="name"></td>' +
            '<td><input type="text" class="form-control" name="department" id="department"></td>' +
            '<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
            '<td>' + actions + '</td>' +
            '</tr>';
          $("table").append(row);
          $("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
          $('[data-toggle="tooltip"]').tooltip();
        });
        // Add row on add button click
        $(document).on("click", ".add", function () {
          var empty = false;
          var input = $(this).parents("tr").find('input[type="text"]');
          input.each(function () {
            if (!$(this).val()) {
              $(this).addClass("error");
              empty = true;
            } else {
              $(this).removeClass("error");
            }
          });
          $(this).parents("tr").find(".error").first().focus();
          if (!empty) {
            input.each(function () {
              $(this).parent("td").html($(this).val());
            });
            $(this).parents("tr").find(".add, .edit").toggle();
            $(".add-new").removeAttr("disabled");
          }
        });
        // Edit row on edit button click
        $(document).on("click", ".edit", function () {
          $(this).parents("tr").find("td:not(:last-child)").each(function () {
            $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
          });
          $(this).parents("tr").find(".add, .edit").toggle();
          $(".add-new").attr("disabled", "disabled");
        });
        // Delete row on delete button click
        $(document).on("click", ".delete", function () {
          $(this).parents("tr").remove();
          $(".add-new").removeAttr("disabled");
        });
      });
    </script>

</head>

<body>
  <!-- 頁首 -->
  <?php
  //取得目前檔案的名稱。透過$_SERVER['PHP_SELF']先取得路徑
  $current_file = $_SERVER['PHP_SELF'];
  //echo $current_file; //查看目前取得的檔案完整
  //然後透過 basename 取得檔案名稱，加上第二個參數".php"，主要是將取得的檔案去掉 .php 這副檔名稱
  $current_file = basename($current_file, ".php");
  //echo $current_file; //查看目前取得後的檔名

  switch ($current_file) {
    default:
      //預設索引為 0
      $index = 0;
      break;
  }
  ?>

  <!-- <div class="container">
    建立第一個 row 空間，裡面準備放格線系統
    <div class="row">
      <div class="col-xs-12">
        選單
        <ul class="nav nav-pills">
          <li role="presentation"><a href="adminLogout.php">登出</a></li>
        </ul>
      </div>
    </div>
  </div> -->

  <!-- 網站內容 -->
  <div id="wrapper">
    <!-- Navigation -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="navbar-header">
        <a class="navbar-brand" href="#"><img src="../images/logo/ohya_logo_main.svg" alt="Ohya"></a>
      </div>
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <!-- Top Navigation: Right Menu -->
      <ul class="nav navbar-right navbar-top-links">
        <li class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown" href="#">
            <i class="fa fa-user fa-fw"></i> adminid <b class="caret"></b>
          </a>
          <ul class="dropdown-menu dropdown-user">
            <!-- <li><a href="adminLogin.php"><i class="fa fa-sign-out fa-fw"></i> Logout</a> -->
            <li role="presentation"><a href="adminLogout.php">登出</a></li>
            </li>
          </ul>
        </li>
      </ul>

      <!-- Sidebar -->
      <div class="navbar-default sidebar" role="navigation">
        <div class="sidebar-nav navbar-collapse">
          <ul class="nav" id="side-menu">
            <li>
              <a href="adminManage.php"> 管理員權限 </a>
            </li>
            <li>
              <a href="adminMember.html"> 會員管理</a>
            </li>
            <li>
              <a href="#booking" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">一般預約管理</a>
              <ul class="collapse nav list-unstyled" id="booking">
                <li class="bg-primary">
                  <a href="adminBookingForm.html">預約訂單管理</a>
                </li>
                <li class="bg-primary">
                  <a href="adminBookingTiming.html">時段管理</a>
                </li>
                <li class="bg-primary">
                  <a href="admindriversRosterTable.html">司機排班管理</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#service" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">服務資訊管理</a>
              <ul class="collapse nav list-unstyled" id="service">
                <li class="bg-primary">
                  <a href="../php/adminServiceCar.php">車種管理</a>
                </li>
                <li class="bg-primary">
                  <a href="adminServiceDriver.html">司機管理</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">旅遊管理</a>
              <ul class="collapse nav list-unstyled" id="homeSubmenu">
                <li class="bg-primary">
                  <a href="adminSpot.html">景點管理</a>
                </li>
                <li class="bg-primary">
                  <a href="adminProgram.html">旅遊方案管理</a>
                </li>
                <li class="bg-primary">
                  <a href="adminMember.html">訂單管理</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#forum" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">討論區管理</a>
              <ul class="collapse nav list-unstyled" id="forum">
                <li class="bg-primary">
                  <a href="adminArticle.html">文章管理</a>
                </li>
                <li class="bg-primary">
                  <a href="adminReport.html">文章檢舉管理</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#discount" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">優惠卷管理</a>
              <ul class="collapse nav list-unstyled" id="discount">
                <li class="bg-primary">
                  <a href="adminDiscount.html">拉霸機優惠卷管理</a>
                </li>
                <li class="bg-primary">
                  <a href="adminDiscountCategory.html">優惠卷種類管理</a>
                </li>
                <li class="bg-primary">
                  <a href="adminDiscountNumber.html">優惠卷折數管理</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Page Content -->
    <div id="page-wrapper">
      <div class="container-fluid">
        <div class="container-lg">
          <div class="table-responsive">
            <div class="table-wrapper">
              <div class="table-title">
                <div class="row">
                  <div class="col-sm-8">
                    <h2>管理員帳號 </h2>
                  </div>
                  <div class="col-sm-4">
                    <button type="button" class="btn btn-info add-new"><i class="fa fa-plus"></i>新增管理員</button>
                  </div>
                </div>
              </div>

              <?php
              echo "<table class='table table-bordered'>";
              echo "<tr>
                      <th>管理員帳號</th>
                      <th>管理員名稱</th>
                      <th>建立時間</th>
                      <th>修改時間</th>
                      <th>動作</th>
                    </tr>";

              class TableRows extends RecursiveIteratorIterator
              {
                function __construct($it)
                {
                  parent::__construct($it, self::LEAVES_ONLY);
                }

                function current()
                {
                  return
                    '<td>' . parent::current() . '</td>';
                }

                function beginChildren()
                {
                  echo "<tr>";
                }

                function endChildren()
                {
                  echo '<td> <a class="add" title="Add" data-toggle="tooltip"><i class="fas fa-plus"></i></a>
                  <a class="edit" title="Edit" data-toggle="tooltip"><i class="fas fa-edit"></i></a>
                  <a class="delete" title="Delete" data-toggle="tooltip"><i class="fas fa-trash-alt"></i></a></td> </tr>' . "\n";
                }
              }

              $servername = "localhost";
              $username = "root";
              $password = "root";
              $dbname = "tebamefe_cfd101g2";

              try {
                $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $conn->prepare("SELECT admin_id, admin_name, creat_date, update_date FROM `admin`");
                $stmt->execute();

                // set the resulting array to associative
                $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);

                foreach (new TableRows(new RecursiveArrayIterator($stmt->fetchAll())) as $k => $v) {
                  echo $v;
                }
              } catch (PDOException $e) {
                echo "Error: " . $e->getMessage();
              }
              $conn = null;
              echo "</table>";
              ?>

            </div>
          </div>
        </div>

      </div>

    </div>


  </div>


  <!-- jQuery -->
  <!-- <script src="../js/jqueryMin.js"></script> -->

  <!-- Bootstrap Core JavaScript -->
  <script src="../js/bootstrapMin.js"></script>

  <!-- Metis Menu Plugin JavaScript -->
  <script src="../js/metisMenuMin.js"></script>

  <!-- Custom Theme JavaScript -->
  <!-- <script src="../js/startmin.js"></script> -->

</body>

</html>