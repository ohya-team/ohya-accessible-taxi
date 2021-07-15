import Vue from "vue";
import axios from "axios";
let vue = new Vue({
    el: "#app",
    data() {
        return {
        signInfo: null,
        }
    },
    mounted() {
        axios.post('../dist/php/signInCheck.php')
            .then((res) => {
                this.signInfo = res.data;
                console.log(res.data);
            })
            .catch( (error) => console.log(error));
    },
})
