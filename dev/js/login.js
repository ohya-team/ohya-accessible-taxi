//變更註冊及登入
let signUp = $('#signupDetail')[0];
let logIn = $('#LoginDetail')[0];
function change(){
    $('.selector span').on( 'click',function(){
    $(this).css('color','#313131');
    $('.selector span').not(this).css('color','#9f9f9f');
    if( $(this)[0].innerText == '註冊'){
      signUp.style.display = "block";
      logIn.style.display = "none";
    }else{
      signUp.style.display = "none";
      logIn.style.display = "block";
      // returnTo();
    }
  })
}
//返回至註冊
function returnTo(){
  $('.loginSpan a').on('click', function(){
    signUp.style.display = "block";
    logIn.style.display = "none";
    $('.selector span')[0].style.color = "#313131";
    $('.selector span')[1].style.color = "#9f9f9f";
    closeLightBox();
  })
}
//關閉燈箱，返回上一頁
function closeLightBox(){
  $('.closeIcon').on('click', function(){
    $('#LoginLightBox').css("display","none");
    window.history.back(-2);
  })
}

//檢查註冊表單
function checkSignup(e){
  //檢查姓名不得空白
  let last = $('#last')[0].lastChild;
  if( last.value.length < 1){
    alert("姓氏不可以空白");
    last.focus();
    e.preventDefault();
    return;
  }else if(last.value.length > 10){
    alert("姓氏不可以超過10個字");
    last.focus();
    e.preventDefault();
    return;
  }
  let first = $('#first')[0].lastChild;
  if( first.value.length < 1){
    alert("名字不可以空白");
    first.focus();
    e.preventDefault();
    return;
  }else if(first.value.length > 10){
    alert("名字不可以超過10個字");
    first.value = '';
    first.focus();
    e.preventDefault();
    return;
  }
  let psw =$('#psw')[0].lastChild;
  let pswEntry = /[a-zA-Z]+[0-9]|[0-9]+[a-zA-Z]/;
  if( psw.value.length > 10){
    alert("密碼不可超過10位");
    psw.value = '';
    psw.focus();
    e.preventDefault();
    return;
  }else if(psw.value.trim().length < 6 || !pswEntry.test(psw.value.trim())){
    alert("密碼不得低於6碼，且須包含中英文數字");
    psw.select();
    e.preventDefault();
    return;
  }
}


//登入
function sendLoginForm(){
  let xhr = new XMLHttpRequest(); 
  xhr.onload = function(){
    if(xhr.status == 200){
      let member = JSON.parse(xhr.responseText);
      if(member.mem_account){
        //將燈箱中的表單上的資料清空，並隱藏起來
        $('#LoginLightBox').style.display = 'none';
        $('#memAccount').value = '';
        $('#memPassword').value = '';  
      }else{
        alert("帳密錯誤");
      }
    }else{
      alert(xhr.status);
      alert("系統異常");
    }
  }
  xhr.open("post", "./php/login.php",true);
  let loginFormData = new FormData(document.getElementById("LoginDetail"));
  xhr.send(loginFormData);
}

//清空表單內容
function clear(){
  document.getElementById('memAccount').value = '';
  document.getElementById('memPassword').value = '';
}

//確認帳號可以使用
function checkId(){   
  let xhr = new XMLHttpRequest(); 
  xhr.onload = function() {
      if(xhr.status == 200){
          document.getElementById("idMsg").innerText = xhr.responseText;
          let idmsg = document.querySelector('#idMsg');
          if(idmsg.innerText == '此帳號已存在, 不可使用'){
            document.querySelector('#signBtn').disabled = true;
          }else{
            document.querySelector('#signBtn').disabled = false;
          }
      }else{
        alert(xhr.status);
      }
  }
  xhr.open("post","./php/signInCheck.php",true);
  xhr.setRequestHeader("content-type" , "application/x-www-form-urlencoded");
  let member = "mem_account=" + document.getElementById("mem_account").value;
  
  xhr.send(member);
}



function init(){
  change();
  returnTo();
  closeLightBox();
  clear();
  document.getElementById('mem_account').onblur = checkId;
  document.getElementById('signupDetail').onsubmit = checkSignup;
  document.getElementById('loginBtn').onclick = sendLoginForm;
}

window.onload = init;
 