<?php
  ob_start();
  session_start();
try{
  
	require_once("./connect_cfd101g2.php");
	$sql = "select * from member where mem_account=:mem_account and mem_password=:mem_password";
	$products = $pdo->prepare($sql);
    $products->bindValue(":mem_account", $_SESSION["mem_account"]);
    $products->bindValue(":mem_password", $_SESSION["mem_password"]);
    $products->execute();
    $memInfos = $products->fetchAll(PDO::FETCH_ASSOC);
    

}catch(PDOException $e){
	//echo $e->getMessage();
	exit("系統暫時不能提供服務");}
   
	?>
    


<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>拉霸機遊戲</title>

    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=2.0">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="./css/jquery.slotmachine.css" type="text/css" media="screen" />
    <script src="./js/slotmachine1.js"></script>
    <script src="./js/slotmachine2.js"></script>
    <style>
    </style>
</head>

<body>

    <div class="pop-up" id="slotmachine-pop-up">

        <section class="slotmachine-container ">
            <a href="index.html"><i id="close-slot" class="fa fa-times" aria-hidden="true"></i></a>
            <div class="slotmachine-topic">
                <h4 class="topic">
                    <span><img src="images/icon/Icon simple-hipchat.svg" alt=""></span>
                    <span>S</span>
                    <span>L</span>
                    <span>O</span>
                    <span>T</span>
                    <span>M</span>
                    <span>A</span>
                    <span>C</span>
                    <span>H</span>
                    <span>I</span>
                    <span>N</span>
                    <span>E</span>
                </h4>
                <h2 class="chinese-topic">拉霸機遊戲</h2>
            </div>
            <div class="slotmachine-content">
                <div class="rules">
                    <h3>遊戲規則</h3>
                    <div class="rule-details">
                        <img src="./images/slotmachine/small-yellow-car.svg" alt="">
                        <p>X 3 = </p>
                        <p class="free">免費乙次</p>
                    </div>
                    <div class="rule-details">
                        <img src="./images/slotmachine/small-black-car.svg" alt="">
                        <p>X 3 = </p>
                        <p>5折優惠乙次</p>
                    </div>
                    <div class="rule-details">
                        <img src="./images/slotmachine/small-gray-car.svg" alt="">
                        <p>X 3 = </p>
                        <p>5折優惠乙次</p>
                    </div>
                    <div class="rule-details">
                        <p>三格皆不同 = </p>
                        <p>免費乙次</p>
                    </div>
                    <div class="rule-details">
                        <p>任兩格相同 = </p>
                        <p>免費乙次</p>
                    </div>
                </div>
                <div class="slotmachine"></div>
            </div>
            <img class="handler" id="randomizeButton" src="./images/slotmachine/handler.svg">
            <div id="randomize">
                <div class="slot-wrap">
                    <div class="slot-group">
                        <div class="slot-items">
                            <div>
                                <div id="machine1" class="randomizeMachine">
                                    <div><img src="images/slotmachine/slot-yellow-taxi.svg" /></div>
                                    <div><img src="images/slotmachine/slot-black-taxi.svg" /></div>
                                    <div><img src="images/slotmachine/slot-gray-taxi.svg" /></div>
                                </div>
                            </div>
                            <div id="machine1Result" class="machineResult">Index: 0</div>
                        </div>

                        <div class=" slot-items">
                            <div>
                                <div id="machine2" class="randomizeMachine">
                                    <div><img src="images/slotmachine/slot-yellow-taxi.svg" /></div>
                                    <div><img src="images/slotmachine/slot-black-taxi.svg" /></div>
                                    <div><img src="images/slotmachine/slot-gray-taxi.svg" /></div>
                                </div>
                            </div>
                            <div id="machine2Result" class=" machineResult">Index: 1</div>
                        </div>

                        <div class="slot-items">
                            <div>
                                <div id="machine3" class="randomizeMachine">
                                    <div><img src="images/slotmachine/slot-yellow-taxi.svg" /></div>
                                    <div><img src="images/slotmachine/slot-black-taxi.svg" /></div>
                                    <div><img src="images/slotmachine/slot-gray-taxi.svg" /></div>
                                </div>
                            </div>
                            <div id="machine3Result" class="machineResult">Index: 2</div>
                        </div>
                        <form action="./php/insert_discount.php" method="POST">
                            <input type="text" name="discount_res" id="slot" >
                            <input type="text" name="member_no" id="" value ="<?=$memInfos[0]["MEM_NO"]?>">
                            <button type="submit">send</button>
                        </form>
                    </div>
                </div>
            </div>
            <button class="btn-main" id="randomizeButton1">
                開始
            </button>
            <div class="animation-trigger">
                <span class="mini ">click to start</span>
                <div class="animation-trigger-sign"><i class="fa fa-angle-double-down" aria-hidden="true"></i></div>
            </div>
        </section>
        <section class="slot-result ">
            <p>AWESOME!!!</p>
            <p>恭喜得到<span id="slotDiscount">9折</span>優惠</p>
            <a href="index.html"><button class="btn-third">確定</button></a>
        </section>

    </div>
    <!-- <script src="../js/slotmachine3.js"></script> -->
    <script>
        const btn = document.querySelector('#randomizeButton');
const btn1 = document.querySelector('#randomizeButton1');
const results = {
    machine1: document.querySelector('#machine1Result'),
    machine2: document.querySelector('#machine2Result'),
    machine3: document.querySelector('#machine3Result')
};
const el1 = document.querySelector('#machine1');
const el2 = document.querySelector('#machine2');
const el3 = document.querySelector('#machine3');
const machine1 = new SlotMachine(el1, { active: 0 }, { delay: 1000 });
const machine2 = new SlotMachine(el2, { active: 0 }, { delay: 1000 });
const machine3 = new SlotMachine(el3, { active: 0 }, { delay: 1000 });

function onComplete(active) {
    results[this.element.id].innerText = ` ${this.active}`;
    document.getElementById("slot").value = `${machine1.active}`+`${machine2.active}`+`${machine3.active}`;
    
}

btn.addEventListener('click', () => {
    machine1.shuffle(8, onComplete);
    setTimeout(() => machine2.shuffle(8, onComplete), 500);
    setTimeout(() => machine3.shuffle(8, onComplete), 1000);
//     setTimeout(() =>{document.querySelector(".slot-result").classList.remove("slot-result-hide");
//     document.querySelector(".slotmachine-container").style.display = 'none';
//  }
//     ,3000)
});
btn1.addEventListener('click', () => {
    machine1.shuffle(8, onComplete);
    setTimeout(() => machine2.shuffle(8, onComplete), 500);
    setTimeout(() => machine3.shuffle(8, onComplete), 1000);
    setTimeout(() =>{document.querySelector(".slot-result").classList.remove("slot-result-hide");
    document.querySelector(".slotmachine-container").style.display = 'none';
 }
    ,3000)

});

    </script>
</body>

</html>