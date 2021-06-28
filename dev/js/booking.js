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
  }
  
  if(rightDay>fulldays[curMonth]){
    rightDay = rightDay-fulldays[curMonth];
    rightMonth = curMonth+1;
  }
  
  $('.deskTable>.weekdays').find('span').append(`${leftMonth+1}/${leftDay} ${curYear} ~ ${rightMonth+1}/${rightDay} ${curYear}`);//5/30 2021 ~ 6/05 2021
  
  //deskTable table th+td
  var curweekDay = curDate.getDay();
  var curweekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  
  for(i=0; i<curweekDays.length; i++){
  
    var leftWeekday = curweekDay+i;
    var j = leftWeekday % 7;
  
    $('.deskTable>table').find('tr').first().append(`
      <th>
        <span>${curweekDays[curweekDay+j-1]}</span>
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
  }
  
  //deskTable table button.btn-bookingTime ->跳下一步
  var bookingBtn = $('.btn-bookingTime');
  
  bookingBtn.on('click',function(){
    $('.pills li:nth-child(2)').removeClass('pills-else').addClass('pills-main');

    $(this).css({
      color: 'white',
      background: '#313131'
    });
  
    $('#step1').css('display','none');
    $('#step2').css('display','initial');
  })
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
  
  var bookingCarBtn = $('.btn-bookingCar');
  
  bookingCarBtn.on('click',function(){
    $('.pills li:nth-child(3)').removeClass('pills-else').addClass('pills-main');
  
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
        <img src="images/type2.png" alt="Avatar">
        <section>
          <h4>福泰 T5</h4>
          <ul>
            <li>一般乘客座位：6位</li>
            <li>輪椅座位：1位</li>
            <li>輪椅升降設備：有</li>
          </ul>
        </section>
    
        <button class="btn-third btn-bookingDriver">選擇</button>
      </div>
    `);
  }
  
  var bookingDriverBtn = $('.btn-bookingDriver');
  
  bookingDriverBtn.on('click',function(){
    $('.pills li:nth-child(4)').removeClass('pills-else').addClass('pills-main');
  
    $(this).css({
      color: 'white',
      background: '#313131'
    });
  
    $('#step3').css('display','none');
    $('#step4').css('display','initial');
  })
}

$(`.pills li.pills-main:nth-child(1)`).on('click', function(){
  $(`#step1`).css('display','initial');
  $(`#step2`).css('display','none');
  $(`#step3`).css('display','none');
  $(`#step4`).css('display','none');
});

$(`.pills li.pills-main:nth-child(2)`).on('click', function(){
  $(`#step1`).css('display','none');
  $(`#step2`).css('display','initial');
  $(`#step3`).css('display','none');
  $(`#step4`).css('display','none');
});

$(`.pills li.pills-main:nth-child(3)`).on('click', function(){
  $(`#step1`).css('display','none');
  $(`#step2`).css('display','none');
  $(`#step3`).css('display','initial');
  $(`#step4`).css('display','none');
});

$(`.pills li.pills-main:nth-child(4)`).on('click', function(){
  $(`#step1`).css('display','none');
  $(`#step2`).css('display','none');
  $(`#step3`).css('display','none');
  $(`#step4`).css('display','initial');
});



$(function(){
  step1();
  step2();
  step3();
});