

function textCounter(field, countfield, maxlimit) {
    // 函數，3個參數，表單名字，表單域元素名，限制字符；  
    if (field.value.length > maxlimit)
        //如果元素區字符數大於最大字符數，按照最大字符數截斷；  
        field.value = field.value.substring(0, maxlimit);
    else
        countfield.value = maxlimit - field.value.length
}

// var x = new FileReader;
// let uploadImg = document.getElementById("uploadImg")
// document.forms[0].elements[0].onchange = function () {
//     x.readAsDataURL(this.files[0]);
//     document.querySelector(".upload-picture-btn").style.opacity = "0";
// }
// x.onloadend = function () {
//     uploadImg.src = this.result
//     uploadImg.style.opacity = "1"
//     console.log(this.result);
// }

import Vue from "vue";
import axios from "axios";
let vue = new Vue({
    el: "#app",
    data() {
        return {
            memInfos: null,
            // file: '',
        }

    },
    created() {

    },
    mounted() {
        console.log(1);
        axios.get('./php/member.php')
            .then(response => (this.memInfos = response.data))
            
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        
    },
    computed: {
        detailInfo() {
    
                if (this.memInfos != null) {
                    return this.memInfos;}
                
        },


    },
    methods: {
        //     submitArticle(){
        //         let self = this;
        //         let formData = new FormData();
        //         formData.append('file', self.file);
        //         axios.post('./php/uploadArticle.php',{
        //           mem_no: self.detailInfo[0].MEM_NO,
        //           art_img:self.file,
        //           art_cat:document.getElementById("art_cat").value,
        //           art_title:document.getElementById("art_title").value,
        //           art_content:document.getElementById("art_content").value,
        //         })
        //         .then(response => ( console.log(this)))
        //         .catch(function (error) { // 请求失败处理              
        //         })

        //     },
        //     fileChange() {
        //         this.file = this.$refs.file.files[0]; //放進上傳的檔案
        //     },
        textCounter(field, countfield, maxlimit) {
            // 函數，3個參數，表單名字，表單域元素名，限制字符；  
            if (field.value.length > maxlimit)
                //如果元素區字符數大於最大字符數，按照最大字符數截斷；  
                field.value = field.value.substring(0, maxlimit);
            else
                countfield.value = maxlimit - field.value.length
                
        },







    },
})