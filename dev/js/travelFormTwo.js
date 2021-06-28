document.getElementById("popbox-btn").addEventListener("click", 
function(){
  document.querySelector(".pop-up-box").classList.add('active')
 });

 document.getElementById("close-button").addEventListener("click", 
function(){
  document.querySelector(".pop-up-box").style.display = "none";
 });