function $id(id) {
  return document.getElementById(id);
}

//var
let selectorBtn = document.getElementsByClassName("selector-btn");
let chosenClass = document.getElementsByClassName('content');
let smallCar = document.getElementsByClassName("small-pic");
let bigPic = document.getElementById('big-pic');
let carContent = document.getElementsByClassName('car-context');

//show service content
function showContent() {
  for (let i = 0; i < selectorBtn.length; i++) {
    if (selectorBtn[i].className == 'selector-btn chosen') {
      chosenClass[i].style.display = "block";
    } else {
      chosenClass[i].style.display = "none";
    }
  }
}
function chosen(e) {
  let chosenBtn = e.target;
  chosenBtn.parentNode.childNodes[1].classList.remove("chosen");
  chosenBtn.parentNode.childNodes[3].classList.remove("chosen");
  chosenBtn.parentNode.childNodes[5].classList.remove("chosen");
  chosenBtn.classList.add("chosen");
  showContent();
}

//show car content
function showCar (){
  for(let i = 0; i < smallCar.length; i++){
    if(bigPic.childNodes[1].src == smallCar[i].childNodes[1].src){
      carContent[i].style.display = "block";
    }else{
      carContent[i].style.display = "none";
    }
  }
}
function showLarge (e) {
  bigPic.childNodes[1].src = e.target.src;
  showCar();
}


//init
function init(){
  for (let i = 0; i < selectorBtn.length; i++) {
    selectorBtn[i].onclick = chosen;
  }
  for (let i = 0; i < smallCar.length; i++){
    smallCar[i].onclick = showLarge;
    showCar();   
  }
}

window.onload = init;
