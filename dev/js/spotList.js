let wordList = document.querySelectorAll('.word-menu li');
wordList.forEach(element => {
    element.addEventListener('click',()=>{
        wordList.forEach(e=>{
            e.classList.remove('active')
        })
        element.classList.add('active');
    })
});