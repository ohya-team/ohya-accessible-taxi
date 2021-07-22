<?php
try{
	require_once("../connect_cfd101g2.php");
    $sql = "SELECT * FROM `art_rep` a1 JOIN art a2 ON a1.ART_NO = a2.ART_NO";
	$art = $pdo->query($sql);
	$artInfos = $art->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($artInfos);
}catch(PDOException $e){
	//echo $e->getMessage();
	exit("系統暫時不能提供服務");}
	?>
