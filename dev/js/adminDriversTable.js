import Vue from "vue";

let vm =  new Vue({
    el: '#app',
    data: {
       driverTable:[
           {DRIVER_NAME:'郭阿明', DRIVER_PHONE:'0912345678', TAXI_LICENCENO:'AA1234'},
           {DRIVER_NAME:'張阿明', DRIVER_PHONE:'0922345678', TAXI_LICENCENO:'BB1234'},
           {DRIVER_NAME:'楊阿明', DRIVER_PHONE:'0932345678', TAXI_LICENCENO:'CC1234'},
           {DRIVER_NAME:'黃阿明', DRIVER_PHONE:'0942345678', TAXI_LICENCENO:'DD1234'},
       ]
    },
    methods: {
        
    },
    computed: {
        
    },
})