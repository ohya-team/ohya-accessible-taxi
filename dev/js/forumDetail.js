import Vue from "vue";
import axios from "axios";
let vue = new Vue({
    el: "#app",
    data() {
        return {
            artInfos: null,
            targetPageId: null,
        }
    },
    mounted() {
        axios.get('./php/forum.php')
            .then(response => (this.artInfos = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
        });
   this.get_href()
    },
    computed: {
      detailInfo(){
          if (this.artInfos != null) {
              return this.artInfos.filter(item => item.ART_NO == this.targetPageId)
          }
      },
  },
  methods: {
      get_href() {
          let nowUrl = window.location.href;
          let targetPageId = nowUrl.split("=")[1];
          this.targetPageId = targetPageId;
          console.log(targetPageId)
      }
  }

})






















function hideAlert(){
    document.getElementById("pop-up").classList.add("alert-hide");
 }

 function appearAlert(){
    if(document.getElementById("pop-up").classList.contains("alert-hide")){
        document.getElementById("pop-up").classList.remove("alert-hide");
    }
 }

 function init(){
    document.getElementById("forum-alert").onclick = appearAlert;
    document.getElementById("forum-alert-close").onclick=hideAlert;
 }
 window.addEventListener("load",init,false);