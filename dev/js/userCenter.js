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

//變更密碼

function init (){
  showUserpic();
}

window.onload = init;