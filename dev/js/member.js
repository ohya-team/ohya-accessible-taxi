function showLightBox(){
  $('#editPsw span').on('click', function(){
    $('#memPswbox').css("display","block");
    closeLightBox();
  })
}
function closeLightBox(){
  $('.closeIcon').on('click', function(){
    $('#memPswbox').css("display","none");
  })
}

function init (){
  showLightBox();
}

window.onload = init;