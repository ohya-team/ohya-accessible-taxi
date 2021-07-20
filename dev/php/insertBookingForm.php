<?php
//新增訂單
require_once "../connect_cfd101g2.php";

$data = json_decode(file_get_contents("php://input"), true);

$b_startLoa = $data["b_startLoa"];
$b_endLoa = $data["b_endLoa"];
$b_else = $data["b_else"];
$b_date = $data["b_date"];
$b_timing = $data["b_timing"];
$b_coopon = $data["b_coopon"];

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

if($b_coopon == '無'){
    $b_coopon = 0;
}

$sql = "INSERT INTO `booking_form`(`MEM_NO`, `DRIVER_NO`, `DISCOUNT_NO`, `ORDER_DATE`, `DRIVING_DATE`, `DRIVING_TIMING`, `TIMING_PRICE`, `ORDER_PRICE`, `ORDER_STATUS`, `LOCATION_START`, `LOCATION_END`, `NEEDING_ELSE`) VALUES (:b_memNo,:b_driverNo,$b_coopon,now(),'$b_date',$b_timing,:b_amount,:b_total,0,'$b_startLoa','$b_endLoa','$b_else');";
$booking = $pdo->prepare($sql);
$booking->bindValue("b_memNo", $data["b_memNo"]);
$booking->bindValue("b_driverNo", $data["b_driverNo"]);
$booking->bindValue("b_amount", $data["b_amount"]);
$booking->bindValue("b_total", $data["b_total"]);
$booking->execute();

//修改時段
require_once "../connect_cfd101g2.php";

$b_timing = $data["b_timing"];

switch($b_timing){
    case '上午':
        $b_timing = 'BOOKING_MORNING';
        break;
    case '下午':
        $b_timing = 'BOOKING_AFTERNOON';
        break;
    case '晚上':
        $b_timing = 'BOOKING_EVENING';
        break;
};

$sql = "UPDATE `booking_timing` SET `$b_timing`= 2\n"

    . "WHERE BOOKING_DATE = '$b_date' and DRIVER_NO = :b_driverNo;";
$booking = $pdo->prepare($sql);
$booking->bindValue("b_driverNo", $data["b_driverNo"]);
$booking->execute();

//修改優惠券使用狀態
$sql = "UPDATE `discount` SET `DISCOUNT_STATUS`=1 WHERE discount_num = :discount_num";
$discount = $pdo->prepare($sql);
$discount->bindValue(":discount_num", $data['discount']);
$discount->execute();
?>