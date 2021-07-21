<?php
try{
	require_once("../connect_cfd101g2.php");
	$sql = "select * from car";
	$products = $pdo->query($sql);
	$carInfos = $products->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($carInfos);
}catch(PDOException $e){
	//echo $e->getMessage();
	exit("系統暫時不能提供服務");}
	?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>服務資訊管理</title>

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
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
</head>
<body>

    <div id="wrapper">
        @@include('../layout/adminSideBar.html')
        <!-- Page Content -->
      <div id="app">
        <div id="page-wrapper">
          <div class="container-fluid">
    
            <div class="container-lg">
              <div class="table-responsive">
                <div class="table-wrapper">
                  <div class="table-title">
                    <div class="row">
                      <div class="col-sm-8">
                        <h2>車種管理 </h2>
                      </div>
                      <div class="col-sm-4">
                        <button type="button" class="btn btn-info add-new"><i class="fa fa-plus"></i> Add New</button>
                      </div>
                    </div>
                  </div>
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>車種編號</th>
                        <th>車種名稱</th>
                        <th>車種狀態</th>
                        <th>動作</th>
                      </tr>
                    </thead>
                    <tbody>
                    <?php
                        foreach(
                          $prodRows as $i => $carInfo)
                        {
                      ?>

                      <tr>
                        <td><?=$carInfo['CAR_NO']?></td>
                        <td><?=$carInfo['CAR_TYPE']?></td>
                        <td>{{car.CAR_STATUS == 1 ? '啟用' : '關閉'}}</td>
                        <td>
                          <a class="add" title="Add" data-toggle="tooltip"><i class="fas fa-plus"></i></a>
                          <a class="edit" title="Edit" data-toggle="tooltip"><i class="fas fa-edit"></i></a>
                          <a class="delete" title="Delete" data-toggle="tooltip"><i class="fas fa-trash-alt"></i></a>
                        </td>
                      </tr>
                      <?php
                        }
                      ?>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
    
          </div>
        </div>
      </div>
    </div>

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