function hideAlert(){
    document.getElementById("pop-up").classList.add("alert-hide");
 }

 function appearAlert(){
    if(document.getElementById("pop-up").classList.contains("alert-hide")){
        document.getElementById("pop-up").classList.remove("alert-hide");
    }
 }

 function init(){
    document.getElementById("forum-alert").onclick = appearAlert;
    document.getElementById("forum-alert-close").onclick=hideAlert;
 }
 window.addEventListener("load",init,false);