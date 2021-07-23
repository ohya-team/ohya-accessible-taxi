import Vue from "vue";
import axios from "axios";

/*模式設定*/
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;

let vm = new Vue({
    el: '#app',
    data: {
        bookingInfo: [],
        memInfo: null,
        discount: null,
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
        tableTh: [],
        driverCountMorning: [],
        driverCountAfternoon: [],
        driverCountEvening: [],
        tempInfo: [],
        carInfo: [],
        driverInfo: [],
        finalInfo: [],
        startLoa: '',
        endLoa: '',
        elseText: '',
        hasCoopn: '無',
        finalAmount: 2000,
        showPopUpBox: false,
    },
    mounted() {
        axios.get('php/booking.php')
        .then(res => this.bookingInfo = res.data)
        .catch(error => console.log(error))

        axios.get('./php/member.php')
        .then(res => (this.memInfo = res.data))
        .catch(error => console.log(error))

        axios.get('./php/getDiscount.php')
            .then(res => (this.discount = res.data))
            .catch(error => console.log(error))

        this.curYear%4 ==0 ? this.fulldays[1]=29 : this.fulldays[1]=28

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

        let doAjax = setTimeout(()=>{

            let sortInfo = this.bookingInfo.reduce((a, c) => {
                a[c.BOOKING_DATE] = [...a[c.BOOKING_DATE] || [], c];
                return a;
            },[]);

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
        btnBookingTime(y, m, d, t){
            let tempArr = [];

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

            this.stepLoading=[false, true];
        },
        btnBookingCar(carType){
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

            this.stepLoading=[false, false, true];
        },
        btnBookingDriver(driverName, driverNo){
            this.finalInfo.push(`${driverName}`, `${driverNo}`)

            this.stepLoading = [false, false, false, true];
        },
        backToStep1(){
            this.stepLoading = [true, false, false, false];
            this.carInfo = [];
            this.driverInfo = [];
            this.finalInfo = [];
        },
        backToStep2(){
            this.stepLoading = [false, true, false, false];
            this.driverInfo = [];
            this.finalInfo.pop(this.finalInfo[2]);
        },
        backToStep3(){
            this.stepLoading = [false, false, true, false];
            this.finalInfo.pop(this.finalInfo[3]);
        },
        submitForm(){
            let self = this;

            if(this.startLoa !== '' && this.endLoa !== ''){
                axios.post('./php/insertBookingForm.php',{
                        b_startLoa:this.startLoa,
                        b_endLoa:this.endLoa,
                        b_else:this.elseText,
                        b_date:this.finalInfo[0],
                        b_timing:this.finalInfo[1],
                        b_coopon:this.hasCoopn.split('+')[0],
                        b_memNo:this.memInfo[0].MEM_NO,
                        b_driverNo:this.finalInfo[4],
                        b_amount:this.finalAmount,
                        b_total:this.finalAmount-this.finalDiscount,
                    })
                    .then(function (response) {
                        self.showPopUpBox = true;
                    })
                    .catch(function (error) {
                        console.log(error)
                        alert('預約失敗')
                    })
            }else{
                self.showPopUpBox = false;
            }
        },
        closePopUpBox(){
            document.getElementById("slotmachine-pop-up").classList.remove('slot-hide');
            this.showPopUpBox = false;
        },
    },
    computed: {
        isNoText(){
            if(this.startLoa =='' || this.endLoa ==''){
                return {'color': '#EF5C5C'}
            }else{
                return {'color': '#60EF66'}
            }
        },
        memCoopon(){
            if (this.discount != null && this.memInfo != null) {
                return this.discount.filter(item => item.MEM_NO == this.memInfo[0].MEM_NO)
            }
        },
        finalDiscount(){
            if(this.hasCoopn !== '無'){
                return this.finalAmount-this.finalAmount*this.hasCoopn.split('+')[1] 
            }else{
                return 0
            }
        }
    },
});