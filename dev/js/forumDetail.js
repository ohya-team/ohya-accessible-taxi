var i = document.getElementById
function hideAlert(){
    i("pop-up").classList.add("alert-hide");
 }

 function appearAlert(){
    if(i("pop-up").classList.contains("alert-hide")){
        i("pop-up").classList.remove("alert-hide");
    }
 }
 function init(){
     i("forum-alert").onclick = appearAlert;
 }
 window.addEventListener("load",init,false);