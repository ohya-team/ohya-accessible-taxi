<?php
//新增訂單
require_once "../connect_cfd101g2.php";

$b_startLoa = $_POST["b_startLoa"];
$b_endLoa = $_POST["b_endLoa"];
$b_else = $_POST["b_else"];
$b_date = $_POST["b_date"];
$b_timing = $_POST["b_timing"];

switch($b_timing){
    case '上午':
        $b_timing = 1;
        break;
    case '下午':
        $b_timing = 2;
        break;
    case '晚上':
        $b_timing = 3;
        break;
};

$sql = "INSERT INTO `booking_form`(`MEM_NO`, `DRIVER_NO`, `DISCOUNT_NO`, `ORDER_DATE`, `DRIVING_DATE`, `DRIVING_TIMING`, `TIMING_PRICE`, `ORDER_PRICE`, `ORDER_STATUS`, `LOCATION_START`, `LOCATION_END`, `NEEDING_ELSE`) VALUES (:b_memNo,:b_driverNo,0,curdate(),'$b_date',$b_timing,:b_amount,:b_total,0,'$b_startLoa','$b_endLoa','$b_else');";
$booking = $pdo->prepare($sql);
$booking->bindValue("b_memNo", $_POST["b_memNo"]);
$booking->bindValue("b_driverNo", $_POST["b_driverNo"]);
$booking->bindValue("b_amount", $_POST["b_amount"]);
$booking->bindValue("b_total", $_POST["b_total"]);
$booking->execute();
?>

<?php
//修改時段
// require_once "../connect_cfd101g2.php";

// $sql = "";
// $booking = $pdo->prepare($sql);
// $booking->bindValue("b_memNo", $_POST["b_memNo"]);
// $booking->execute();

// header('Location:./booking.html');
?>