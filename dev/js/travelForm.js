import Vue from "vue";
import axios from "axios";
let vue = new Vue({
    el: "#app",
    data() {
        return {
            info: null,
            program: null,
            defaultMeminfo: false,
            memNum: 1,
            thisProgram: '1',
            menInfo:null,
        }
    },
    mounted() {
        axios.get('./php/member.php')
            .then(response => (this.info = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        axios.get('./php/program.php')
            .then(response => (this.program = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });

    },
    computed: {
        thisProgramInfo() {
            if (this.program != null)
                return this.program.filter(item => item.PROGRAM_NO == this.thisProgram)
        },

    },
    methods: {
        toggleUser() {
            this.defaultMeminfo = !this.defaultMeminfo
        },
        add() {
            let peopleNum = document.getElementById('people_num');
            if (this.memNum < peopleNum.max) {
                this.memNum++;
            }
        },
        subtraction() {
            if (this.memNum > 1) {
                this.memNum--;
            }
        },
        storageValue(e) {
            let storageArr = ['first_name', 'last_name', 'email', 'address', 'phone', 'program', 'dep_time', 'pickup_place', 'people_num', 'remarks', 'discount']
            let storage = window.sessionStorage;
            storageArr.forEach(e => {
                storage.setItem(e, document.getElementById(e).value)
            });
        }
    }

})