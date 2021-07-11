import Vue from "vue";
import axios from "axios";

let vm =  new Vue({
    el: '#app',
    data: {
        driverName: '',
        driverPhone: '',
        driverTable: [],
    },
    mounted() {
        axios.get('../php/driver.php').then(res => this.driverTable = res.data).catch(error => console.log(error));
    },
    methods: {
        findName(){
            for(let i=0; i<this.driverTable.length; i++){
                if(this.driverName == this.driverTable[i].DRIVER_NAME || this.driverPhone == this.driverTable[i].DRIVER_PHONE){
                    this.driverTable = [{
                        DRIVER_NAME:this.driverTable[i].DRIVER_NAME,
                        DRIVER_PHONE:this.driverTable[i].DRIVER_PHONE,
                    }]
                }
            }
            this.driverName = '';
            this.driverPhone = '';
        },
        showAll(){
            this.$mount('#app');
        }
    },
})