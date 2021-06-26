let same = document.getElementById('same');
let last_name = document.getElementById('last-name');
let first_name = document.getElementById('first-name');
let email = document.getElementById('email');
let phone = document.getElementById('phone');

same.addEventListener('click', showAccountInfo)
function showAccountInfo() {
    if (same.checked == true) {
        first_name.value = '家輝';
        first_name.disabled = true;
        last_name.value = '林';
        last_name.disabled = true;
        email.value = '123@gmail.com';
        email.disabled = true;
        phone.value = '0912345678';
        phone.disabled = true;
    } else {
        first_name.value = '';
        first_name.disabled = false;
        last_name.value = '';
        last_name.disabled = false;
        email.value = '';
        email.disabled = false;
        phone.value = '';
        phone.disabled = false;
    }
}
let subtraction = document.getElementById('subtraction');
let people_num = document.getElementById('people-num');
let add = document.getElementById('add');
subtraction.addEventListener('click', () => {
    people_num.value = parseInt(people_num.value);
    if (people_num.value > 1) {
        people_num.value--;
    }
})
add.addEventListener('click', () => {
    people_num.value = parseInt(people_num.value);
    if (people_num.value < 6) {
        people_num.value++;
        add.disabled = false;
    }
})

