

//圖片瀏覽
function showUserpic(){
  $('#imgInp').on('change' , function(){
    previewFile();
  })
}
function previewFile() {
  const preview = document.getElementById('uploadUserpic');
  const file = document.querySelector('input[type=file]').files[0];
  const reader = new FileReader();
  reader.addEventListener("load", function () {
    preview.src = reader.result;
    preview.style.maxWidth = '150px';
    preview.style.maxHeight = '150px';
  }, false);
  if (file) {
    reader.readAsDataURL(file);
  }
}
//修改個人資料

function editUserProfile(){
  console.log($('.editBtn'));
  console.log($('.show'));
  $('.editBtn').on('click', ()=> {
    console.log('in');
      $('.edit').css("display","block");
      $('.show').css("display","none");
      $(this).css('display','none');
      $('.editBtn').not(this).css('display','block');
      console.log($('.editBtn').not(this));
      console.log($(this));
      

  })
}

//變更密碼
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
  showUserpic();
  editUserProfile();
}

window.onload = init;