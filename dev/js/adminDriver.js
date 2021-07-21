import Vue from "vue";
import axios from "axios";
/*模式設定*/
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;
let vue = new Vue({
    el: "#app",
    data() {
        return {
            driverInfo: null,
            targetPageId: null,
            driverImage: '',
            driverFile: '',
            taxiImage: '',
            taxifile: '',

        }
    },
    mounted() {
        this.get_href();
        axios.post('../php/driver.php')
            .then((res) => {
                this.driverInfo = res.data;
                this.driverImage = '.' + res.data[0].DRIVER_PIC;
                this.driverFile = res.data[0].DRIVER_PIC;
                this.taxiImage = '.' + res.data[0].TAXI_PIC;
                this.taxifile = res.data[0].TAXI_PIC;
            })
            .catch((error) => console.log(error));
    },

    computed: {
        detailInfo() {
            if (this.driverInfo != null) {
                debugger;
                return this.driverInfo.filter(driver => driver.DRIVER_NO == this.targetPageId)
            }
        },
    },

    methods: {
        driverfileChange(e) {
            let file = e.target.files[0];
            let readFile = new FileReader();
            readFile.readAsDataURL(file);
            readFile.addEventListener('load', (e) => this.driverImage = e.target.result);
        },
        taxifileChange(e) {
            let file = e.target.files[0];
            let readFile = new FileReader();
            readFile.readAsDataURL(file);
            readFile.addEventListener('load', (e) => this.taxiImage = e.target.result);
        },
        get_href() {
            let nowUrl = window.location.href;
            let targetPageId = nowUrl.split("=")[1];
            this.targetPageId = parseInt(targetPageId);
        },
        changeStatus(driver) {
            let confirmThisChange = (confirm('確定要變更權限嗎?'))
            if ( driver.DRIVER_STATUS == '1' ){
                driver.DRIVER_STATUS = '0';
                // document.getElementById('changeStatus').value = "復權";
            }else{
                driver.DRIVER_STATUS = '1'
                // document.getElementById('changeStatus').value = "停權";
            };
            if (confirmThisChange == true) {
                axios.post('../php/driverStatus.php', {
                    driverNo: driver.DRIVER_NO,
                    driverStatus: driver.DRIVER_STATUS,
                })
                    .then(function (res) {
                        console.log(res);
                    })
                    .catch(function (error) {
                        alert('更改失敗');
                    })
            }
        }
    },
})