// document.getElementById("popbox-btn").addEventListener("click", function () {
//     document.querySelector(".pop-up-box").classList.add('active')
// });
document.getElementById("pop-up-slot").addEventListener("click", function () {
    document.getElementById("slotmachine-pop-up").classList.remove('slot-hide');
    document.querySelector(".pop-up-box").classList.remove('active');

});

function textCounter(field, countfield, maxlimit) {
    // 函數，3個參數，表單名字，表單域元素名，限制字符；  
    if (field.value.length > maxlimit)
        //如果元素區字符數大於最大字符數，按照最大字符數截斷；  
        field.value = field.value.substring(0, maxlimit);
    else
        countfield.value = maxlimit - field.value.length
}

var x = new FileReader;
let uploadImg = document.getElementById("uploadImg")
document.forms[0].elements[0].onchange = function () {
    x.readAsDataURL(this.files[0]);
    document.querySelector(".upload-picture-btn").style.opacity = "0";
}
x.onloadend = function () {
    uploadImg.src = this.result
    uploadImg.style.opacity = "1"
    console.log(this.result);
}

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
                return this.memInfos;
            }

        },

    },
})