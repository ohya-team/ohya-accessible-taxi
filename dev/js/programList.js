let heart = document.querySelectorAll('.heart');
heart.forEach(e => e.addEventListener('click', ()=>{
    e.classList.toggle('active');
}))
