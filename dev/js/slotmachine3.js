const btn = document.querySelector('#randomizeButton');
const btn1 = document.querySelector('#randomizeButton1');
const results = {
    machine1: document.querySelector('#machine1Result'),
    machine2: document.querySelector('#machine2Result'),
    machine3: document.querySelector('#machine3Result')
};
const el1 = document.querySelector('#machine1');
const el2 = document.querySelector('#machine2');
const el3 = document.querySelector('#machine3');
const machine1 = new SlotMachine(el1, { active: 0 }, { delay: 1000 });
const machine2 = new SlotMachine(el2, { active: 0 }, { delay: 1000 });
const machine3 = new SlotMachine(el3, { active: 0 }, { delay: 1000 });

function onComplete(active) {
    results[this.element.id].innerText = `Index: ${this.active}`;
}

btn.addEventListener('click', () => {
    machine1.shuffle(8, onComplete);
    setTimeout(() => machine2.shuffle(8, onComplete), 500);
    setTimeout(() => machine3.shuffle(8, onComplete), 1000);
    setTimeout(() =>{document.querySelector(".slot-result").classList.remove("slot-result-hide");
    document.querySelector(".slotmachine-container").style.display = 'none';
 }
    ,3000)
});
btn1.addEventListener('click', () => {
    machine1.shuffle(8, onComplete);
    setTimeout(() => machine2.shuffle(8, onComplete), 500);
    setTimeout(() => machine3.shuffle(8, onComplete), 1000);
    setTimeout(() =>{document.querySelector(".slot-result").classList.remove("slot-result-hide");
    document.querySelector(".slotmachine-container").style.display = 'none';
 }
    ,3000)
});

document.getElementById("close-slot").addEventListener('click', () => {
    document.getElementById("slotmachine-pop-up").classList.add("slot-hide");
})