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
    },
    methods: {
        findForm(){
            for(let i=0; i<this.bookingFormInfoAll.length; i++){
                //每一筆比對輸入的內容是否有吻合
                if(this.checkFormNo == this.bookingFormInfoAll[i].ORDER_NO){
                    this.bookingFormInfoAll = [{
                        CAR_TYPE:this.bookingFormInfoAll[i].CAR_TYPE,
                        DISCOUNT_NO:this.bookingFormInfoAll[i].DISCOUNT_NO,
                        DRIVER_NAME:this.bookingFormInfoAll[i].DRIVER_NAME,
                        DRIVER_NO:this.bookingFormInfoAll[i].DRIVER_NO,
                        DRIVER_PHONE:this.bookingFormInfoAll[i].DRIVER_PHONE,
                        DRIVING_DATE:this.bookingFormInfoAll[i].DRIVING_DATE,
                        DRIVING_TIMING:this.bookingFormInfoAll[i].DRIVING_TIMING,
                        LOCATION_END:this.bookingFormInfoAll[i].LOCATION_END,
                        LOCATION_START:this.bookingFormInfoAll[i].LOCATION_START,
                        MEM_FIRSTNAME:this.bookingFormInfoAll[i].MEM_FIRSTNAME,
                        MEM_LASTNAME:this.bookingFormInfoAll[i].MEM_LASTNAME,
                        MEM_NO:this.bookingFormInfoAll[i].MEM_NO,
                        MEM_PHONE:this.bookingFormInfoAll[i].MEM_PHONE,
                        NEEDING_ELSE:this.bookingFormInfoAll[i].NEEDING_ELSE,
                        ORDER_DATE:this.bookingFormInfoAll[i].ORDER_DATE,
                        ORDER_NO:this.bookingFormInfoAll[i].ORDER_NO,
                        ORDER_PRICE:this.bookingFormInfoAll[i].ORDER_PRICE,
                        ORDER_STATUS:this.bookingFormInfoAll[i].ORDER_STATUS,
                        TAXI_LICENCENO:this.bookingFormInfoAll[i].TAXI_LICENCENO,
                        TIMING_PRICE:this.bookingFormInfoAll[i].TIMING_PRICE,
                    }]
                }
            }

            this.checkFormNo=''
        },
        showAll(){
            this.$mount('#app');//回到mounted前
        }
    },
    computed: {
        memForm() {
            if (this.bookingFormInfoAll != null && this.memInfo != null) {
                return this.bookingFormInfoAll.filter(item => item.MEM_NO == this.memInfo[0].MEM_NO)
            }
        }
    },
});