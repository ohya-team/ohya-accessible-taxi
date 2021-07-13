import Vue from "vue";
import axios from "axios";

let vm =  new Vue({
    el: '#app',
    data: {
        canSee: false,
        whref: window.location.href.split('?driver_no=')[1],
        driverRoster: [],
        leaveStatus1: {status:1, info:'上班'},
        leaveStatus0: {status:0, info:'休假'},
    },
    mounted() {
        axios.get('../php/driverRoster.php')
        .then(res => this.driverRoster = res.data)
        .catch(error => console.log(error))
    },
    methods: {
        backToTable(){
            location.href=`admindriversRosterTable.html`
        },
    },
});