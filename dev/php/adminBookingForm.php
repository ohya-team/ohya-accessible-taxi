<?php
try{
	require_once("../connect_cfd101g2.php");

    $sql = "SELECT f.*, m.MEM_LASTNAME,m.MEM_FIRSTNAME,m.MEM_PHONE,d.DRIVER_NAME,d.DRIVER_PHONE,c.CAR_TYPE,d.TAXI_LICENCENO FROM booking_form f JOIN member m JOIN car c JOIN driver d WHERE f.DRIVER_NO = d.DRIVER_NO and f.MEM_NO = m.MEM_NO and d.CAR_NO = c.CAR_NO ORDER BY f.ORDER_NO DESC;";
    
	$bookingForm = $pdo->query($sql);
	$formInfo = $bookingForm->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($formInfo);

}catch(PDOException $e){
	exit("系統暫時不能提供服務");
}
?>