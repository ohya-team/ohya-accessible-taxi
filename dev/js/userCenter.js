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
    preview.style.maxWidth = '300px';
    // preview.style.maxHeight = '150px';
  }, false);
  if (file) {
    reader.readAsDataURL(file);
  }
}

//修改個人資料
// function editUserProfile(){
//   console.log('inn');
//   $('#editBtn').on('click', ()=> {
//     console.log('in');
//     $('#editBtn').css('display','none');
//     $('#userFrom').css('display','none');
//     $('#fromEdit').css('display','block');
//     $('.finishBtn').css('display','block');
//   })
//   $('.finishBtn').on('click', ()=> {
//     $('.finishBtn').css('display','none');
//     $('#fromEdit').css('display','none');
//     $('#userFrom').css('display','block');
//     $('#editBtn').css('display','block');
//   })
// }

//變更密碼

function init (){
  showUserpic();
  //editUserProfile();
  // $('#editBtn')[0].onclick = editUserProfile;
  // console.log($('#editBtn'));
}

window.onload = init;