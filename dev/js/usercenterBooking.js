import Vue from "vue";
import axios from "axios";

/*模式設定*/
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;

let vm = new Vue({
    el: '#app',
    data: {
        bookingFormInfoAll:[],
        bookingFormInfo:[],
        memInfo:[],
        timing:['上午', '下午', '晚上'],
        checkFormNo:'',
    },
    mounted() {
        axios.get('php/usercenterBooking.php')
        .then(res => this.bookingFormInfoAll = res.data)
        .catch(error => console.log(error))

        axios.get('./php/member.php')
        .then(res => (this.memInfo = res.data))
        .catch(error => console.log(error))

        let doAjax = setTimeout(()=>{
            for(let info in this.bookingFormInfoAll){
                if(info.MEM_NO == this.memInfo[0].MEM_NO){
                    this.bookingFormInfo.push(this.bookingFormInfoAll[info])
                }
            }
        },1000)
    },
    methods: {
        findForm(){
            for(let i=0; i<this.bookingFormInfo.length; i++){
                //每一筆比對輸入的內容是否有吻合
                if(this.checkFormNo == this.bookingFormInfo[i].ORDER_NO){
                    this.bookingFormInfo = [{
                        CAR_TYPE:this.bookingFormInfo[i].CAR_TYPE,
                        DISCOUNT_NO:this.bookingFormInfo[i].DISCOUNT_NO,
                        DRIVER_NAME:this.bookingFormInfo[i].DRIVER_NAME,
                        DRIVER_NO:this.bookingFormInfo[i].DRIVER_NO,
                        DRIVER_PHONE:this.bookingFormInfo[i].DRIVER_PHONE,
                        DRIVING_DATE:this.bookingFormInfo[i].DRIVING_DATE,
                        DRIVING_TIMING:this.bookingFormInfo[i].DRIVING_TIMING,
                        LOCATION_END:this.bookingFormInfo[i].LOCATION_END,
                        LOCATION_START:this.bookingFormInfo[i].LOCATION_START,
                        MEM_FIRSTNAME:this.bookingFormInfo[i].MEM_FIRSTNAME,
                        MEM_LASTNAME:this.bookingFormInfo[i].MEM_LASTNAME,
                        MEM_NO:this.bookingFormInfo[i].MEM_NO,
                        MEM_PHONE:this.bookingFormInfo[i].MEM_PHONE,
                        NEEDING_ELSE:this.bookingFormInfo[i].NEEDING_ELSE,
                        ORDER_DATE:this.bookingFormInfo[i].ORDER_DATE,
                        ORDER_NO:this.bookingFormInfo[i].ORDER_NO,
                        ORDER_PRICE:this.bookingFormInfo[i].ORDER_PRICE,
                        ORDER_STATUS:this.bookingFormInfo[i].ORDER_STATUS,
                        TAXI_LICENCENO:this.bookingFormInfo[i].TAXI_LICENCENO,
                        TIMING_PRICE:this.bookingFormInfo[i].TIMING_PRICE,
                    }]
                }
            }

            this.checkFormNo=''
        },
        showAll(){
            this.$mount('#app');//回到mounted前
        }
    },
});