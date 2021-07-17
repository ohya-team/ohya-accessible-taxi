import Vue from "vue";
import axios from "axios";

/*模式設定*/
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;

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