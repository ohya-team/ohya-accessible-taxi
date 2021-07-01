//預約步驟隱藏
$('#step2').css('display','none');
$('#step3').css('display','none');
$('#step4').css('display','none');

function step1(){//步驟一

  //時段選擇 ->需顯示今天後8-14天
  var curDate = new Date();
  var curMonth = curDate.getMonth();//index: 5+1月
  var curDay = curDate.getDate();//27號
  var curYear = curDate.getFullYear();//2021年
  
  var fulldays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];//每個月有幾天
  
  //處理閏年是29天
  if(curYear%4 ==0){
    fulldays[1]=29;
  }
  
  //deskTable .weekdays
  var leftDay = curDay+7;//34
  var rightDay = curDay+13;
  
  //處理7~15天後大於這個月的天數，要跳下一個月
  if(leftDay>fulldays[curMonth]){
    leftDay = leftDay-fulldays[curMonth];
    leftMonth = curMonth+1;
  }else{
    leftMonth = curMonth;
  }
  
  if(rightDay>fulldays[curMonth]){
    rightDay = rightDay-fulldays[curMonth];
    rightMonth = curMonth+1;
  }else{
    rightMonth = curMonth;
  }
  
  //deskTable weekdays
  $('.deskTable>.weekdays').find('span').append(`${leftMonth+1}/${leftDay} ${curYear} ~ ${rightMonth+1}/${rightDay} ${curYear}`);//5/30 2021 ~ 6/05 2021

  //mobileTable weekdays
  $('.mobileTable>.weekdays').find('span').append(`${curYear}年 ${leftMonth+1}月`);//2021年 7月
  
  
  //deskTable & mobileTable table th+td
  var curweekDay = curDate.getDay();
  var curweekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  var curweekDaysMobile = ['日', '一', '二', '三', '四', '五', '六'];
  
  for(i=0; i<curweekDays.length; i++){
  
    var leftWeekday = curweekDay+i;
    var j = leftWeekday % 7;
    
    //deskTable
    $('.deskTable>table').find('tr').first().append(`
      <th>
        <span>${curweekDays[j]}</span>
        <span class="day">${leftMonth+1}/${leftDay+i}</span>
      </th>
    `);
    for(r=2; r<5; r++){
      $('.deskTable table').find(`tr:nth-child(${r})`).append(`
      <td>
        <button class="btn-bookingTime">預約</button>
      </td>
    `);
    }

    //mobileTable
    $('.mobileTable>table').find('tr').first().append(`<th>${curweekDaysMobile[j]}</th>`);

    $('.mobileTable>table').find('tr:nth-child(2)').append(`<td class="dayMobile">${leftDay+i}</td>`);
  }
  
  //deskTable table button.btn-bookingTime ->跳下一步
  var bookingBtn = $('.btn-bookingTime');
  
  bookingBtn.on('click', function(){
    //重置按鈕顏色
    bookingBtn.css({
      color: '#313131',
      background: 'white'
    });

    //跳轉步驟div
    $('.pills li:nth-child(1)').on('click', function(){
      $('#step1').css('display','initial');
      $('#step2').css('display','none');
      $('#step3').css('display','none');
      $('#step4').css('display','none');
    });

    //選定後的按鈕顏色
    $(this).css({
      color: 'white',
      background: '#313131'
    });
  
    $('#step1').css('display','none');
    $('#step2').css('display','initial');
  })

  //mobileTable table button.btn-bookingTime ->跳下一步
  var dayMobileBtn = $('td.dayMobile');

  dayMobileBtn.on('click', function(){
    //重置按鈕顏色
    dayMobileBtn.css({
      color: '#313131',
      background: 'white'
    });

    //選定後的按鈕顏色
    $(this).css({
      color: '#313131',
      background: '#ffd900'
    });

    //要先按日期 時段按鈕才可以按
    var dayTimeMobileBtn = $('.mobileTable>button');
  
    dayTimeMobileBtn.on('click', function(){
      //重置按鈕顏色
      dayTimeMobileBtn.css({
        color: '#313131',
        background: 'white'
      });
  
      //跳轉步驟div
      $('.pills li:nth-child(1)').on('click', () => {
        $('#step1').css('display','initial');
        $('#step2').css('display','none');
        $('#step3').css('display','none');
        $('#step4').css('display','none');
      });
  
      //選定後的按鈕顏色
      $(this).css({
        color: 'white',
        background: '#313131'
      });
    
      $('#step1').css('display','none');
      $('#step2').css('display','initial');
    })
  });

}

function step2(){
  for(i=0; i<4; i++){
    $('#step2 .cards').append(`
      <div class="card">
        <img src="images/type2.png" alt="Avatar">
        <section>
          <h4>福泰 T5</h4>
          <ul>
            <li>一般乘客座位：6位</li>
            <li>輪椅座位：1位</li>
            <li>輪椅升降設備：有</li>
          </ul>
        </section>
    
        <button class="btn-third btn-bookingCar">選擇</button>
      </div>
    `);
  }
  
  // carChoosing button.btn-bookingCar ->跳下一步
  var bookingCarBtn = $('.btn-bookingCar');
  
  bookingCarBtn.on('click',function(){
    //重置按鈕顏色
    bookingCarBtn.css({
      color: '#313131',
      background: 'white'
    });

    //跳轉步驟div
    $('.pills li:nth-child(2)').on('click',function(){
      $('#step1').css('display','none');
      $('#step2').css('display','initial');
      $('#step3').css('display','none');
      $('#step4').css('display','none');
    });
  
    //選定後的按鈕顏色
    $(this).css({
      color: 'white',
      background: '#313131'
    });
  
    $('#step2').css('display','none');
    $('#step3').css('display','initial');
  })
}

function step3(){
  for(i=0; i<5; i++){
    $('#step3 .cards').append(`
    <div class="card">
      <div class="avatar">
        <div class="avatar-bookingDriver">
          <img src="images/driver/01_driver.jpg" alt="">
        </div>
        <h4>郭阿明</h4>
      </div>
      <button class="btn-third btn-bookingDriver">選擇</button>
    </div>
    `);
  }
  
  // driverChoosing button.btn-bookingDriver ->跳下一步
  var bookingDriverBtn = $('.btn-bookingDriver');
  
  bookingDriverBtn.on('click',function(){
    //重置按鈕顏色
    bookingDriverBtn.css({
      color: '#313131',
      background: 'white'
    });    

    //跳轉步驟div
    $('.pills li:nth-child(3)').on('click',function(){
      $('#step1').css('display','none');
      $('#step2').css('display','none');
      $('#step3').css('display','initial');
      $('#step4').css('display','none');
    });
    
    //選定後的按鈕顏色
    $(this).css({
      color: 'white',
      background: '#313131'
    });
  
    $('#step3').css('display','none');
    $('#step4').css('display','initial');
  })
}

function formChecking(){
  var memInfo = {
    noText: '',
    lastName : '粥',
    FirstName: '四瓶',
    email: '123@gmail.com',
    phone: '0912345678',
  };
  
  $('#memId').on('change', function(){
    if(this.checked){
      $('#b-lastName').attr('value', memInfo.lastName);
      $('#b-FirstName').attr('value', memInfo.FirstName );
      $('#b-email').attr('value' , memInfo.email);
      $('#b-phone').attr('value', memInfo.phone);
    }else{
      $('#b-lastName').removeAttr('value');
      $('#b-FirstName').removeAttr('value');
      $('#b-email').removeAttr('value');
      $('#b-phone').removeAttr('value');
    }
  })
} 

var bookingSub = $('#bookingSub');
var popUpBox = $('.pop-up-box');

bookingSub.on("click",function(){
  popUpBox.addClass('active');
});

$(function(){
  step1();
  step2();
  step3();
  formChecking();
});