import Vue from "vue";
import axios from "axios";

/*模式設定*/
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;

let vm = new Vue({
    el: '#app',
    data: {
        bookingInfo: [],//php/booking.php
        memInfo: null,//php/member.php
        discount: null,//php/getDiscount.php
        pilltext: ['確認時間','確認車種','確認司機','訂單確認'],
        stepLoading: [true,false,false,false],
        curMonth: new Date().getMonth(),
        curYear: new Date().getFullYear(),
        fulldays: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        leftDay: new Date().getDate()+7,
        rightDay: new Date().getDate()+13,
        leftMonth: '',
        rightMonth: '',
        curweekDay: new Date().getDay(),
        deskCurweekDays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        MobileCurweekDays: ['日', '一', '二', '三', '四', '五', '六'],
        tableTh: [],//放步驟1用的
        driverCountMorning: [],//每日的早上時段司機可預約人數有幾位
        driverCountAfternoon: [],//每日的下午時段司機可預約人數有幾位
        driverCountEvening: [],//每日的晚上時段司機可預約人數有幾位
        tempInfo: [],//步驟2 3的資料這裡撈
        carInfo: [],//放步驟2用的
        driverInfo: [],//放步驟3用的
        finalInfo: [],//放步驟4用的
        startLoa: '',//步驟4 出發地
        endLoa: '',//步驟4用的 目的地
        elseText: '',//步驟4用的 目的地
        hasCoopn: '無',//步驟4 優惠券使用
        finalAmount: 2000,//步驟4用的 時段金額
        // finalDiscount: 0,//步驟4用的 折扣內容
        showPopUpBox: false,
    },
    mounted() {
        //撈資料-步驟一到步驟三用
        axios.get('php/booking.php')
        .then(res => this.bookingInfo = res.data)
        .catch(error => console.log(error))

        axios.get('./php/member.php')
        .then(res => (this.memInfo = res.data))
        .catch(error => console.log(error))

        axios.get('./php/getDiscount.php')
            .then(res => (this.discount = res.data))
            .catch(error => console.log(error))

        //處理閏年是29天
        this.curYear%4 ==0 ? this.fulldays[1]=29 : this.fulldays[1]=28

        //處理7~15天後大於這個月的天數，要跳下一個月
        if(this.leftDay>this.fulldays[this.curMonth]){
            this.leftDay -=this.fulldays[this.curMonth];
            this.leftMonth = this.curMonth+1;
        }else{
            this.leftMonth = this.curMonth;
        }
        
        if(this.rightDay>this.fulldays[this.curMonth]){
            this.rightDay -= this.fulldays[this.curMonth];
            this.rightMonth = this.curMonth+1;
        }else{
            this.rightMonth = this.curMonth;
        }

        //處理Table th+td & 個位數月日前面要+'0'
        for(let i=0; i<this.deskCurweekDays.length; i++){
            let j = (this.curweekDay+i) % 7;

            let newDay = this.leftDay+i;
            let newMonth = this.leftMonth+1;

            if((this.leftDay+i)>this.fulldays[this.curMonth]){
                newDay -= this.fulldays[this.curMonth];
                newMonth +=1;
            }

            this.tableTh.push({
                'year':this.curYear,
                'deskWeek':this.deskCurweekDays[j],
                'MobileWeek':this.MobileCurweekDays[j],
                'month':newMonth<10 ? "0"+newMonth : newMonth,
                'day':newDay<10 ? "0"+newDay : newDay
            });
        }

        let doAjax = setTimeout(()=>{//因為Ajax會延遲 所以設setTimeout

            let sortInfo = this.bookingInfo.reduce((a, c) => {
                a[c.BOOKING_DATE] = [...a[c.BOOKING_DATE] || [], c];
                return a;
            },[]);

            //判斷該時段司機人數是否為0，以此控制按鈕狀態
            for(let data in sortInfo){
                let driversM=0;
                let driversA=0;
                let driversE=0;

                for(let i in sortInfo[data]){                   
                    sortInfo[data][i].BOOKING_MORNING == 1 ? driversM +=1 : driversM +=0
                    
                    sortInfo[data][i].BOOKING_AFTERNOON == 1 ? driversA +=1 : driversA +=0
                    
                    sortInfo[data][i].BOOKING_EVENING == 1 ? driversE +=1 : driversE +=0
                }

                this.driverCountMorning.push(driversM == 0 ? 'btn-bookingFull' : 'btn-bookingTime')
                this.driverCountAfternoon.push(driversA == 0 ? 'btn-bookingFull' : 'btn-bookingTime')
                this.driverCountEvening.push(driversE == 0 ? 'btn-bookingFull' : 'btn-bookingTime')
            }
        },1000)

    },
    methods: {
        btnBookingTime(y, m, d, t){//確認點選按鈕的對應時段與司機尚餘幾位+確認可預約車型
            let tempArr = [];

            //確認點選按鈕的對應時段與司機尚餘幾位
            for(let i in this.bookingInfo){
                if(this.bookingInfo[i].BOOKING_DATE.split('-')[1] == m && this.bookingInfo[i].BOOKING_DATE.split('-')[2] == d && this.bookingInfo[i][t]==1){    
                    tempArr.push({
                        carNo:this.bookingInfo[i].CAR_NO,
                        carPic:this.bookingInfo[i].CAR_PIC,
                        carType:this.bookingInfo[i].CAR_TYPE,
                        cardes:this.bookingInfo[i].CAR_DESCRIBE,
                        driverNo:this.bookingInfo[i].DRIVER_NO,
                        driverPic:this.bookingInfo[i].DRIVER_PIC,
                        driverName:this.bookingInfo[i].DRIVER_NAME,
                    });
                }
            }
    
            //確認可預約車型有哪些&刪去重覆的
            this.tempInfo = tempArr.reduce((a, c) => {
                a[c.carNo] = [...a[c.carNo] || [], c];
                return a;
            },[]);
    
            for(let i=1; i<this.tempInfo.length; i++){    
                this.carInfo.push({
                    carNo:this.tempInfo[i][0].carNo,
                    carPic:this.tempInfo[i][0].carPic,
                    carType:this.tempInfo[i][0].carType,
                    cardes:this.tempInfo[i][0].cardes
                })
            }

            //步驟4表單顯示用
            switch(t){
                case 'BOOKING_MORNING':
                    t='上午';
                    break;
                case 'BOOKING_AFTERNOON':
                    t='下午';
                    break;
                case 'BOOKING_EVENING':
                    t='晚上';
                    break;
            }
            
            this.finalInfo.push(`${y}-${m}-${d}`, t)

            //跳下一個步驟畫面
            this.stepLoading=[false, true];
        },
        btnBookingCar(carType){//確認這台車符合挑選時段可預約的司機有哪些
            for(let i=1; i<this.tempInfo.length; i++){
                for(let j=0; j<this.tempInfo[i].length; j++){
                    if(carType == this.tempInfo[i][j].carType){
                        this.driverInfo.push({
                            driverNo:this.tempInfo[i][j].driverNo,
                            driverPic:this.tempInfo[i][j].driverPic,
                            driverName:this.tempInfo[i][j].driverName
                        });
                    }
                }
            }

            this.finalInfo.push(`${carType}`)
            
            //跳下一個步驟畫面
            this.stepLoading=[false, false, true];
        },
        btnBookingDriver(driverName, driverNo){//確認挑選的司機是誰
            this.finalInfo.push(`${driverName}`, `${driverNo}`)

            //跳下一個步驟畫面
            this.stepLoading = [false, false, false, true];
        },
        backToStep1(){
            this.stepLoading = [true, false, false, false];
            this.carInfo = [];//重新點選時，資料清空
            this.driverInfo = [];//重新點選時，資料清空
            this.finalInfo = [];//重新點選時，資料清空
        },
        backToStep2(){
            this.stepLoading = [false, true, false, false];
            this.driverInfo = [];//重新點選時，資料清空
            this.finalInfo.pop(this.finalInfo[2]);//重新點選時，資料清空
        },
        backToStep3(){
            this.stepLoading = [false, false, true, false];
            this.finalInfo.pop(this.finalInfo[3]);//重新點選時，資料清空
        },
        submitForm(){
            let self = this;

            axios.post('./php/insertBookingForm.php',{
                    b_startLoa:this.startLoa,
                    b_endLoa:this.endLoa,
                    b_else:this.elseText,
                    b_date:this.finalInfo[0],
                    b_timing:this.finalInfo[1],
                    b_coopon:document.getElementsByName('b_coopon')[0].value,
                    b_memNo:this.memInfo[0].MEM_NO,
                    b_driverNo:this.finalInfo[4],
                    b_amount:this.finalAmount,
                    b_total:this.finalAmount*this.finalDiscount,
                })
                .then(function (response) {
                    self.showPopUpBox = true;
                })
                .catch(function (error) {
                    console.log(error)
                    alert('預約失敗')
                })
        },
        closePopUpBox(){
            document.getElementById("slotmachine-pop-up").classList.remove('slot-hide');
            this.showPopUpBox = false;
        },
    },
    computed: {
        issubmit(){
            if(this.startLoa !== '' && this.endLoa !== ''){
                return 'submit'
            }else{
                return 'button'
            }
        },
        isNoText(){
            if(this.issubmit=='button'){
                return {'color': '#EF5C5C'}
            }else{
                return {'color': '#60EF66'}
            }
        },
        memCoopon(){
            if (this.discount != null && this.memInfo != null) {
                return this.discount.filter(item => item.MEMBER_NO == this.memInfo[0].MEM_NO)
            }
        },
        finalDiscount(){
            for(let coopon in this.memCoopon){
                if(coopon.DISCOUNT_NUM == document.getElementsByName("b_coopon")[0].value){
                    return this.finalAmount*(1-coopon.DISCOUNT_PER)
                }else{
                    return 0
                }
            }
        }
    }
});