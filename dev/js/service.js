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
function showCar() {
  for (let i = 0; i < smallCar.length; i++) {
    if (bigPic.childNodes[1].src == smallCar[i].childNodes[1].src) {
      carContent[i].style.display = "block";
    } else {
      carContent[i].style.display = "none";
    }
  }
}
$('.smallPic').on('click', function () {
  $('#bigPic')[0].children[0].src = $(this)[0].childNodes[1].src;
  $(this)[0].classList.add('chosen');
  $('.smallPic').not(this).removeClass('chosen');
  showCar();
})
//car slider rwd
let j = 1;
$('.carSlider #narRight').on('click', function () {

  if (j > 3) {
    j = 0;
    carContent[j].style.display = "block";
    carContent[3].style.display = "none";
  } else {
    carContent[j].style.display = "block";
    carContent[j - 1].style.display = "none";
  }
  j += 1;
  $('#carImage img')[0].src = `./images/car/car${j}.png`
})
$('.carSlider #narLeft').on('click', function () {
  j -= 1;
  if (j == 1) {
    carContent[0].style.display = "block";
    carContent[1].style.display = "none";
    carContent[3].style.display = "none";
    $('#carImage img')[0].src = `./images/car/car${1}.png`
  } else if (j == 2) {
    carContent[1].style.display = "block";
    carContent[0].style.display = "none";
    carContent[2].style.display = "none";
    $('#carImage img')[0].src = `./images/car/car${2}.png`
  } else if (j == 3) {
    carContent[2].style.display = "block";
    carContent[1].style.display = "none";
    carContent[3].style.display = "none";
    $('#carImage img')[0].src = `./images/car/car${3}.png`
  } else if (j == 4) {
    carContent[3].style.display = "block";
    carContent[0].style.display = "none";
    carContent[2].style.display = "none";
    $('#carImage img')[0].src = `./images/car/car${4}.png`
  } else {
    j = 1;
    carContent[0].style.display = "block";
    carContent[1].style.display = "none";
    carContent[3].style.display = "none";
    $('#carImage img')[0].src = `./images/car/car${1}.png`
  }
})


//driver lightBox????????????
function showLightBox() {
  $('.image li').on('click', function (e) {
    $.ajax({
      type: 'POST',
      url: './php/driverLightbox.php',
      data: { DRIVER_NO: e.target.id },
      success: function (res) {
          let driverInfo = JSON.parse(res);
        if (driverInfo.DRIVER_STATUS == 1) {
          $('#driverName').text(driverInfo.DRIVER_NAME);
          $('#driverPhone').text(driverInfo.DRIVER_PHONE);
          $('#driverContext').text(driverInfo.DRIVER_DESCRIBE);
          $('#driverPic').html(`<img src="${driverInfo.DRIVER_PIC}" alt="">`);
          $('#carLisence').text('????????????:' + driverInfo.TAXI_LICENCENO);
          $('#carDes').html(driverInfo.TAXI_DESCRIBE);
          $('#driverCarPic').html(`<img src="${driverInfo.TAXI_PIC}" alt="">`);
        }
      },
      error: () => {
        alert("error");
      }
    });
    $('#driverLightBox').css("display", "block");
    closeLightBox();
  })
}
function closeLightBox() {
  $('.closeIcon').on('click', function () {
    $('#driverLightBox').css("display", "none");
  })
}

//????????????????????????
function sendServiceForm() {
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status == 200) {
      let serveInfos = JSON.parse(xhr.responseText);
      document.getElementById('SERVE_TITLE').innerText = serveInfos[0].SERVE_TITLE;
      document.getElementById('SERVE_DESCRIBE').innerText = serveInfos[0].SERVE_DESCRIBE;
      document.getElementById('SERVE_PIC').src = serveInfos[0].SERVE_PIC;
    } else {
      alert(xhr.status);
      alert("????????????");
    }
  }
  xhr.open("post", "./php/service.php", true);
  let serviceFormData = new FormData(document.getElementById('serviceInfo'));
  xhr.send(serviceFormData);
}

//????????????????????????
function sendCarForm() {
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status == 200) {
      let carInfos = JSON.parse(xhr.responseText);
      document.getElementById('bigPic').children[0].src = carInfos[0].CAR_PIC;
      for (let i = 0; i < carInfos.length; i++) {
        document.getElementsByClassName('smallWrap')[0].children[i].children[0].src = carInfos[i].CAR_PIC;
        document.getElementsByClassName('carContext')[i].children[0].innerText = carInfos[i].CAR_TYPE;
        document.getElementsByClassName('carContext')[i].children[1].innerText = carInfos[i].CAR_DESCRIBE;
        document.getElementsByClassName('carContext')[i].style.display = 'none';
        document.getElementsByClassName('carContext')[0].style.display = 'block';
      }
    } else {
      alert(xhr.status);
      alert("????????????");
    }
  }
  xhr.open("post", "./php/car.php", true);
  let carFormData = new FormData(document.getElementById('carInfos'));
  xhr.send(carFormData);
}
//????????????????????????
function sendDriverForm() {
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status == 200) {
      let driverInfos = JSON.parse(xhr.responseText);
      for (let i = 0; i < driverInfos.length; i++) {
        if (driverInfos[i].DRIVER_STATUS == 1) {
          document.getElementsByClassName('driverContentPic')[i].src = driverInfos[i].DRIVER_PIC;
          document.getElementsByClassName('driverContentPic')[i].nextElementSibling.innerText = driverInfos[i].DRIVER_NAME;
          document.getElementsByClassName('driverContentPic')[i].id = driverInfos[i].DRIVER_NO;
        }else{
          document.getElementsByClassName('driverContentPic')[i].parentElement.style.display = 'none';
        }
      }
    } else {
      alert(xhr.status);
      alert("????????????");
    }
  }
  xhr.open("post", "./php/driver.php", true);
  let driverFormData = new FormData(document.getElementById('driverInfos'));
  xhr.send(driverFormData);
}


//init
function init() {
  for (let i = 0; i < selectorBtn.length; i++) {
    selectorBtn[i].onclick = chosen;
  }
  sendServiceForm();
  sendCarForm();
  // $('#driver-content #narLeft')[0].onclick = moveLeft;
  // $('#driver-content #narRight')[0].onclick = moveRight;
  //autoMove();
  showCar();
  sendDriverForm();
  showLightBox();
}

window.onload = init;
