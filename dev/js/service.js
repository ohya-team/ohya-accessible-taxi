function $id(id) {
  return document.getElementById(id);
}

let selectorBtn = document.getElementsByClassName("selector-btn");
let chosenClass = document.getElementsByClassName('content');

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


//init
window.addEventListener("load", function () {
  for (let i = 0; i < selectorBtn.length; i++) {
    selectorBtn[i].onclick = chosen;
  }
})

