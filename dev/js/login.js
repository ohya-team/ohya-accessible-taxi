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
      returnTo();
    }
  })
}
//返回至註冊
function returnTo(){
  $('.loginSpan span').on('click', function(){
    signUp.style.display = "block";
    logIn.style.display = "none";
    $('.selector span')[0].style.color = "#313131";
    $('.selector span')[1].style.color = "#9f9f9f";
  })
}
//關閉燈箱
function closeLightBox(){
  $('.closeIcon').on('click', function(){
    $('#LoginLightBox').css("display","none");
  })
}

//檢查註冊表單
function checkSignup(e){
  console.log('in');
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
    first.focus();
    e.preventDefault();
    return;
  }
}

//console.log($('#last')[0].lastChild);

function init(){
  change();
  closeLightBox();
  document.getElementById('signupDetail').onsubmit = checkSignup;
}

window.onload = init;
