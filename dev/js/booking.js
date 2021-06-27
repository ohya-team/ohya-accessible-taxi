//預約步驟隱藏
$('#step2').css('display','none');
$('#step3').css('display','none');
$('#step4').css('display','none');

//步驟一 時段選擇 ->需顯示8-14天 ===========
var curDate = new Date();
var curMonth = new Date().getMonth();//index: 5+1月
var curDay = new Date().getDate();//27號
var curYear = new Date().getFullYear();//2021年

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

$('.deskTable .weekdays').find('span').append(`${leftMonth+1}/${leftDay} ${curYear} ~ ${rightMonth+1}/${rightDay} ${curYear}`);//5/30 2021 ~ 6/05 2021

//deskTable table
var curweekDay = new Date().getDay();
var curweekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

for(i=0; i<curweekDays.length; i++){
  $('.deskTable table').find('tr').first().append(`
    <th>
      <span>${curweekDays[curweekDay+i]}</span>
      <span class="day">${leftMonth+1}/${leftDay+i}</span>
    </th>
  `);
  for(r=2; r<5; r++){
    $('.deskTable table').find(`tr:nth-child(${r})`).append(`
    <td>
      <button class="btn-booking">預約</button>
    </td>
  `);
  }
}

// $('.deskTable table tr').find('button').on('click',function(){
//   $('#step1').css('display','none');
//   $('#step1').css('display','initial');
// });