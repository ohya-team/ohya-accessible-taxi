import Vue from "vue";
import axios from "axios";
let vue = new Vue({
    el: "#app",
    data() {
        return {
        memInfo: null,
        }
    },
    mounted() {
        axios.post('../dist/php/member.php')
            .then((res) => {
                this.memInfo = res.data;
                console.log(res.data);
            })
            .catch( (error) => console.log(error));
    },
})


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