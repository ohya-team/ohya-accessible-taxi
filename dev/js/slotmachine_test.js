import axios from "axios";
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
    document.getElementById("slot").value = `${machine1.active}` + `${machine2.active}` + `${machine3.active}`;

}

btn.addEventListener('click', () => {
    machine1.shuffle(8, onComplete);
    setTimeout(() => machine2.shuffle(8, onComplete), 500);
    setTimeout(() => machine3.shuffle(8, onComplete), 1000);
    setTimeout(() => {
        insertDiscount();
    }
        , 3000)
    

});
btn1.addEventListener('click', () => {
    machine1.shuffle(8, onComplete);
    setTimeout(() => machine2.shuffle(8, onComplete), 500);
    setTimeout(() => machine3.shuffle(8, onComplete), 1000);
    setTimeout(() => {
        insertDiscount();
     }
        , 3000)
});



function name() {//會員資料
    return axios.get('./php/member.php')
        .then(result => showOutput(result.data[0].MEM_NO))
        .catch(function (error) {
            console.log(error)
        });

}
name();
function getDiscountNum() {//拉霸機結果
    return axios.post('./php/discount_test.php', {
        discount_res: document.getElementById('slot').value
    })
        .then(result => showDiscountNum(result.data[0].DISCOUNT_INFO))
        .catch(function (error) {
            console.log(error)
        });

}
function showDiscountNum(res) {//顯示幾折
    document.getElementById('slotDiscount').innerText = res;
}
function showOutput(res) {//顯示會員編號
    let mem_no = res;
    document.getElementById('mem_no').value = res;
    // console.log(res);
    
}
function insertDiscount() {//把優惠卷放入資料庫
    axios.post('./php/insert_discount_test.php', {
        member_no: document.getElementById('mem_no').value,
        discount_res: document.getElementById('slot').value
    }).then(function (response) {
        getDiscountNum();
        document.querySelector(".slot-result").style.display = 'block';
        document.querySelector(".slotmachine-container").style.display = 'none';
    })
        .catch(function (error) {
            alert('系統出現異常，稍後會有專人處理');
        })
}