import Vue from "vue";
import axios from "axios";

let vm =  new Vue({
    el: '#app',
    data: {
        driverTable: [],
        driverRoster:[],
    },
    mounted() {
        axios.get('../php/driver.php')
        .then(res => this.driverTable = res.data)
        .catch(error => console.log(error))

        // axios.get('../php/bookingTiming.php')
        // .then(res => this.driverRoster = res.data)
        // .catch(error => console.log(error))

    },
})

// for(let i=0; i<vm.driverRoster.length; i++){    
//     if(vm.driverRoster[i].DRIVER_NO == 1){
//         drverTiming.push(vm.driverRoster[i].DRIVER_NO);              
//     }
// }