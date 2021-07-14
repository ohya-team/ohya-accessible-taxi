import Vue from "vue";
import axios from "axios";
let vue = new Vue({
    el: "#app1",
    data() {
        return {
        memInfo: null,
        }
    },
    mounted() {
        axios.post('../dist/php/member.php')
            .then((res) => {
                this.memInfo = res.data;
                console.log(res.data);
            })
            .catch( (error) => console.log(error));
    },
})
