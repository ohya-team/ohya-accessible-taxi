<?php
session_start();
session_unset(); //刪除資料內容

header('Location:../index.html');
?>