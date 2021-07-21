import Vue from "vue";
import axios from "axios";

/*模式設定*/
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;
let storage = window.sessionStorage;

let vue = new Vue({
    el: "#app",
    data() {
        return {
            info: null,
            program: null,
            defaultMeminfo: false,
            memNum: 1,
            thisProgram: '1',
            menInfo: null,
            discount: null,
            storageobj: {
                first_name: storage.getItem('first_name'),
                last_name: storage.getItem('last_name'),
                email: storage.getItem('email'),
                phone: storage.getItem('phone'),
                dep_time: storage.getItem('dep_time'),
                address: storage.getItem('address'),
                pickup_place: storage.getItem('pickup_place'),
                program: storage.getItem('program'),
                people_num: storage.getItem('people_num'),
                remarks: storage.getItem('remarks'),
                discount: storage.getItem('discount'),
            }
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
        axios.get('./php/getDiscount.php')
            .then(response => (this.discount = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
    },
    computed: {
        thisProgramInfo() {
            if (this.program != null) {
                return this.program.filter(item => item.PROGRAM_NO == this.thisProgram)
            }
        },
        thisMemDiscount() {
            if (this.discount != null && this.info != null) {
                return this.discount.filter(item => item.MEM_NO == this.info[0].MEM_NO)
            }
        },
        storageDiscount() {
            if (this.thisMemDiscount != null) {
                let stDiscount = [...this.thisMemDiscount];
                if (this.storageobj.discount != 0) {
                    stDiscount = stDiscount.filter(item => item.DISCOUNT_NUM == this.storageobj.discount)
                    return stDiscount
                }
            }

        }
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
            storageArr.forEach(e => {
                storage.setItem(e, document.getElementById(e).value)
            });
        },
    }

})