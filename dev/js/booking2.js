import Vue from "vue";
import axios from "axios";

let vm = new Vue({
    el: '#app',
    data: {
        bookingInfo: [],//php/booking.php
        checkTime:'確認時間',
        checkCar:'確認車種',
        checkDriver:'確認司機',
        checkForm:'訂單確認',
        curMonth: new Date().getMonth(),//index: 6+1月
        curYear: new Date().getFullYear(),//2021年
        fulldays: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        leftDay: new Date().getDate()+7,
        rightDay: new Date().getDate()+13,
        leftMonth: '',
        rightMonth: '',
        curweekDay: new Date().getDay(),
        deskCurweekDays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],//桌機抓中文星期用的
        MobileCurweekDays: ['日', '一', '二', '三', '四', '五', '六'],//手機抓中文星期用的
        tableTh: [],//放步驟1用的
        tempInfo: [],//步驟2 3的資料這裡撈
        carInfo: [],//放步驟2用的
        driverInfo: [],//放步驟3用的
    },
    mounted() {
        //撈資料-步驟一到步驟三用
        axios.get('php/booking.php')
        .then(res => this.bookingInfo = res.data)
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
            this.rightDay -= this.fulldays[curMonth];
            this.rightMonth = this.curMonth+1;
        }else{
            this.rightMonth = this.curMonth;
        }

        //處理Table th+td & 個位數月日前面要+'0'
        for(let i=0; i<this.deskCurweekDays.length; i++){
            let j = (this.curweekDay+i) % 7;

            this.tableTh.push({
                'deskWeek':this.deskCurweekDays[j],
                'MobileWeek':this.MobileCurweekDays[j],
                'month':(this.leftMonth+1)<10 ? "0"+(this.leftMonth+1) : this.leftMonth+1,
                'day':(this.leftDay+i)<10 ? "0"+(this.leftDay+i) : this.leftDay+i
            });
        }
    },
    methods: {
        btnBookingTime(m, d, t){//確認點選按鈕的對應時段與司機尚餘幾位+確認可預約車型
            let driverCount = 0;
            let tempArr = [];
            
            //確認點選按鈕的對應時段與司機尚餘幾位
            for(let i in this.bookingInfo){
                if(this.bookingInfo[i].BOOKING_DATE.split('-')[1] == m && this.bookingInfo[i].BOOKING_DATE.split('-')[2] == d && this.bookingInfo[i][t]==1){
                    driverCount +=1;

                    tempArr.push({
                        carNo:this.bookingInfo[i].CAR_NO,
                        carPic:this.bookingInfo[i].CAR_PIC,
                        carType:this.bookingInfo[i].CAR_TYPE,
                        cardes:this.bookingInfo[i].CAR_DESCRIBE,
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

            console.log(m,d,t,driverCount,this.tempInfo,this.carInfo);
        },
        btnBookingCar(carType){//確認這台車符合挑選時段可預約的司機有哪些
            for(let i=1; i<this.tempInfo.length; i++){
                for(let j=0; j<this.tempInfo[i].length; j++){
                    if(carType == this.tempInfo[i][j].carType){
                        this.driverInfo.push({
                            driverPic:this.tempInfo[i][j].driverPic,
                            driverName:this.tempInfo[i][j].driverName
                        });
                    }
                }
            }
            console.log(this.driverInfo)
        },
    },
    computed: {
        btnStatus(){//控步驟一時段預約是否額滿的CSS
            return {
                'btn-bookingTime': true,
                // 'btn-bookingFull': this.checkTime == '確認時間',
            };
        },
        
    },
});