let popboxBtn = document.getElementById('popbox-btn');
let popUpBox = document.querySelector('.pop-up-box');
let closeBtn =document.querySelector('.close-button')
popboxBtn.addEventListener("click", () => {
  popUpBox.classList.add('active')
});
closeBtn.addEventListener("click", () => {
  popUpBox.classList.remove('active');
});
console.log('hi');