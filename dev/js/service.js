//var
let selectorBtn = document.getElementsByClassName("selector-btn");
let chosenClass = document.getElementsByClassName('content');
let smallCar = document.getElementsByClassName("smallPic");
let carContent = document.getElementsByClassName('carContext');

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
$('.smallPic').click(function(){
  $('#bigPic')[0].children[0].src = $(this)[0].childNodes[1].src;
  $(this)[0].classList.add('chosen');
  $('.smallPic').not(this).removeClass('chosen');
  showCar();
})
//car slider
 let j = 1;
  $('.carSlider #narRight').click( function () {

    if( j > 3){
      j = 0;
      carContent[j].style.display = "block";
      carContent[3].style.display = "none";
    }else{
      carContent[j].style.display = "block";
      carContent[j-1].style.display = "none";
      console.log(carContent[j]);
    }
    j+=1;
    $('#carImage img')[0].src = `./images/car/car${j}.png`
    console.log(`./images/car/car${j}.png`);
  })
  $('.carSlider #narLeft').click( function () {
    j-=1;
    console.log(j);
    if( j == 1){
      carContent[0].style.display = "block";
      carContent[1].style.display = "none";
      carContent[3].style.display = "none";
      $('#carImage img')[0].src = `./images/car/car${1}.png`
    }else if( j == 2 ){
      carContent[1].style.display = "block";
      carContent[0].style.display = "none";
      carContent[2].style.display = "none";
      $('#carImage img')[0].src = `./images/car/car${2}.png`
    }else if( j == 3){
      carContent[2].style.display = "block";
      carContent[1].style.display = "none";
      carContent[3].style.display = "none";
      $('#carImage img')[0].src = `./images/car/car${3}.png`
    }else if( j == 4 ){
      carContent[3].style.display = "block";
      carContent[0].style.display = "none";
      carContent[2].style.display = "none";
      $('#carImage img')[0].src = `./images/car/car${4}.png`
    }else{
      j = 1;
      console.log(j);
      carContent[0].style.display = "block";
      carContent[1].style.display = "none";
      carContent[3].style.display = "none";
      $('#carImage img')[0].src = `./images/car/car${1}.png`
    }
    console.log(`./images/car/car${j}.png`) ;
  })


//driver slider narrow move
function moveLeft(){
  $("#driverSlider").animate({
    left: 0 
  })
}
function moveRight(){
  $("#driverSlider").animate({
    left: $('.image').width() * -1
  })
}
//driver slider auto move
function autoMove() {
  let imgCount = $('.image').length;
  let i = 0;

  setInterval(function () {
      if (i == imgCount) {
        i = 0;
      };
      $("#driverSlider").animate({
          left: $('.image').width() * -1 *i,
      });
      i++;
  }, 4000);
};
//driver lightBox
function showLightBox(){
  $('.image li').click( function(){
    $('#driverLightBox').css("display","block");
    closeLightBox();
  })
}
function closeLightBox(){
  $('.closeIcon').click( function(){
    $('#driverLightBox').css("display","none");
  })
}

//init
function init(){
  for (let i = 0; i < selectorBtn.length; i++) {
    selectorBtn[i].onclick = chosen;
  }
  $('#driver-content #narLeft')[0].onclick = moveLeft;
  $('#driver-content #narRight')[0].onclick = moveRight;
  autoMove();
  showCar();
  showLightBox();
}

window.onload = init;
