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
        deskCurweekDays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],//抓中文星期用的
        MobileCurweekDays: ['日', '一', '二', '三', '四', '五', '六'],//抓中文星期用的
        tableTh: [],//實際要放日曆用的
    },
    mounted() {
        //撈資料-步驟一到步驟三用
        axios.get('php/booking.php')
        .then(res => this.bookingInfo = res.data)
        .catch(error => console.log(error))

        //處理閏年是29天
        if(this.curYear%4 ==0){
            this.fulldays[1]=29;
        }

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

            if((this.leftMonth+1)>9 && (this.leftDay+i)>9){
                this.tableTh.push({
                    'deskWeek':this.deskCurweekDays[j],
                    'MobileWeek':this.MobileCurweekDays[j],
                    'month':this.leftMonth+1,
                    'day':this.leftDay+i
                });
            }else if((this.leftMonth+1)>9 && (this.leftDay+i)<=9){
                this.tableTh.push({
                    'deskWeek':this.deskCurweekDays[j],
                    'MobileWeek':this.MobileCurweekDays[j],
                    'month':this.leftMonth+1,
                    'day':'0'+(this.leftDay+i)
                });
            }else if((this.leftMonth+1)<=9 && (this.leftDay+i)>9){
                this.tableTh.push({
                    'deskWeek':this.deskCurweekDays[j],
                    'MobileWeek':this.MobileCurweekDays[j],
                    'month':'0'+(this.leftMonth+1),
                    'day':this.leftDay+i
                });
            }else{
                this.tableTh.push({
                    'deskWeek':this.deskCurweekDays[j],
                    'MobileWeek':this.MobileCurweekDays[j],
                    'month':'0'+(this.leftMonth+1),
                    'day':'0'+(this.leftDay+i)
                });
            }
        }
    },
    methods: {
        btnBookingMorning(m, d){
            let count = 0;
            for(let i in this.bookingInfo){
                if(this.bookingInfo[i].BOOKING_DATE.split('-')[1] == m && this.bookingInfo[i].BOOKING_DATE.split('-')[2] == d && this.bookingInfo[i].BOOKING_MORNING==1){
                    count +=1;
                }
            }
            console.log(m,d,count);
        },
        btnBookingAfternoon(m, d){
            let count = 0;
            for(let i in this.bookingInfo){
                if(this.bookingInfo[i].BOOKING_DATE.split('-')[1] == m && this.bookingInfo[i].BOOKING_DATE.split('-')[2] == d && this.bookingInfo[i].BOOKING_AFTERNOON==1){
                    count +=1;
                }
            }
            console.log(m,d,count);
        },
        btnBookingevening(m, d){
            let count = 0;
            for(let i in this.bookingInfo){
                if(this.bookingInfo[i].BOOKING_DATE.split('-')[1] == m && this.bookingInfo[i].BOOKING_DATE.split('-')[2] == d && this.bookingInfo[i].BOOKING_AFTERNOON==1){
                    count +=1;
                }
            }
            console.log(m,d,count);
        },
    },
    computed: {
        btnStatus(){
            return {
                'btn-bookingTime': true,
                // 'btn-bookingFull': this.checkTime == '確認時間',
            };
        },
        
    },
});