let popboxBtn = document.getElementById('popbox-btn');
let popUpBox = document.querySelector('.pop-up-box');
popboxBtn.addEventListener("click", () => {
  popUpBox.classList.add('active')
});
popboxBtn.addEventListener("click", () => {
  popUpBox.classList.remove('active');
});
