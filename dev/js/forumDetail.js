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
            artInfos: null,
            targetPageId: null,
            showPopUpBox: false,
            randomArticle: null,
        }
    },
    mounted() {
        axios.get('./php/forum.php')
            .then(response => (this.artInfos = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        axios.get('./php/randomArticle.php')
        .then(response => (this.randomArticle = response.data))
        .catch(function (error) { // 请求失败处理
            console.log(error);
        });
        axios.get('./php/member.php')
        .then(response => (this.memInfos = response.data))
        .catch(function (error) { // 请求失败处理
            console.log(error);
        });
        this.get_href()
    },
    computed: {
        detailInfo() {
            if (this.artInfos != null) {
                return this.artInfos.filter(item => item.ART_NO == this.targetPageId)
            }
        },
    },
    filters: {
        ellipsis(value) {
            const len = 27;
            if (value.length > len) {
                return value.slice(0, len) + '...'
            } else {
                return value;
            }
           
        }
    },
    methods: {
        get_href() {
            let nowUrl = window.location.href;
            let targetPageId = nowUrl.split("=")[1];
            this.targetPageId = targetPageId;
            console.log(targetPageId)
        },
        showReport() {
            this.showPopUpBox = true;
        },
        cancelReport() {
            this.showPopUpBox = false;
        },
        getRadioVal(event){
            document.getElementById("report").value = event.target.value;
            console.log(document.getElementById("report").value)
        },

          submitReport(){
            let self = this;
            axios.post('./php/uploadReport.php', {
                art_no:self.detailInfo[0].ART_NO,
                rep_reason:document.getElementById("report").value,

              })
              .then(function (response) {
                // alert('檢舉成功');
                document.getElementById("pop-up-box").classList.add('active');
                document.getElementById("pop-up-box").style.display = "flex";
                self.showPopUpBox = false;
           
                
              })
              .catch(function (error) {
                alert('檢舉失敗');
              })
            },
            uploadclick(e){
                document.getElementById("art_no").value = e ;
            }
    }

})






















