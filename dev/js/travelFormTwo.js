let popboxBtn = document.getElementById('popbox-btn');
let popUpBox = document.querySelector('.pop-up-box');
let closeBtn = document.getElementById('close-button')
popboxBtn.addEventListener("click", () => {
  popUpBox.classList.add('active')
});
closeBtn.addEventListener("click", () => {
  document.getElementById("slotmachine-pop-up").classList.remove('slot-hide');
  document.querySelector(".pop-up-box").classList.remove('active');
});
