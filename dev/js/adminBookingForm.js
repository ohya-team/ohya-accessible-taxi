import Vue from "vue";
import axios from "axios";

/*模式設定*/
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;

let vm = new Vue({
    el: '#app',
    data: {
        bookingFormInfoAll: [],
        bookingFormInfoCheck: [],
        timing: ['上午', '下午', '晚上'],
        formStatus: ['尚未完成', '已完成'],
        clientName: '',
        clientPhone: '',
        clientNo: '',
        clientOrderNo: '',
        allisShow: true,
    },
    mounted() {
        axios.get('../php/adminBookingForm.php')
        .then(res => this.bookingFormInfoAll = res.data)
        .catch(error => console.log(error))
    },
    methods: {
        findForm(){
            this.bookingFormInfoCheck = []

            for(let data in this.bookingFormInfoAll){
                if(this.clientName == (this.bookingFormInfoAll[data].MEM_LASTNAME+this.bookingFormInfoAll[data].MEM_FIRSTNAME) || this.clientPhone == this.bookingFormInfoAll[data].MEM_PHONE || this.clientNo == this.bookingFormInfoAll[data].MEM_NO || this.clientOrderNo == this.bookingFormInfoAll[data].ORDER_NO){
                    this.bookingFormInfoCheck.push({
                        CAR_TYPE:this.bookingFormInfoAll[data].CAR_TYPE,
                        DISCOUNT_NO:this.bookingFormInfoAll[data].DISCOUNT_NO,
                        DRIVER_NAME:this.bookingFormInfoAll[data].DRIVER_NAME,
                        DRIVER_NO:this.bookingFormInfoAll[data].DRIVER_NO,
                        DRIVER_PHONE:this.bookingFormInfoAll[data].DRIVER_PHONE,
                        DRIVING_DATE:this.bookingFormInfoAll[data].DRIVING_DATE,
                        DRIVING_TIMING:this.bookingFormInfoAll[data].DRIVING_TIMING,
                        LOCATION_END:this.bookingFormInfoAll[data].LOCATION_END,
                        LOCATION_START:this.bookingFormInfoAll[data].LOCATION_START,
                        MEM_FIRSTNAME:this.bookingFormInfoAll[data].MEM_FIRSTNAME,
                        MEM_LASTNAME:this.bookingFormInfoAll[data].MEM_LASTNAME,
                        MEM_NO:this.bookingFormInfoAll[data].MEM_NO,
                        MEM_PHONE:this.bookingFormInfoAll[data].MEM_PHONE,
                        NEEDING_ELSE:this.bookingFormInfoAll[data].NEEDING_ELSE,
                        ORDER_DATE:this.bookingFormInfoAll[data].ORDER_DATE,
                        ORDER_NO:this.bookingFormInfoAll[data].ORDER_NO,
                        ORDER_PRICE:this.bookingFormInfoAll[data].ORDER_PRICE,
                        ORDER_STATUS:this.bookingFormInfoAll[data].ORDER_STATUS,
                        TAXI_LICENCENO:this.bookingFormInfoAll[data].TAXI_LICENCENO,
                        TIMING_PRICE:this.bookingFormInfoAll[data].TIMING_PRICE,
                    })                    
                }
            }

            this.clientName = '';
            this.clientPhone = '';
            this.clientNo = '';
            this.clientOrderNo = '';

            this.bookingFormInfoCheck == [] ? this.allisShow = true : this.allisShow = false;
        },
        showAll(){
            this.bookingFormInfoCheck = []
            this.allisShow = true
        },
    },
    computed: {
        
    },
});