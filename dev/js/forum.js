function showHideMenuOrder(){
    let menu = document.getElementById("dropdown-menu-order");
      if(menu.classList.contains("hide")){
        menu.classList.remove("hide");
      }else{
        menu.classList.add("hide"); 
    }
  }
  function selectOrder(e){
    let word = document.querySelector("#dropdown-list p");
    word.textContent = e.target.innerHTML;
    let menu = document.querySelectorAll("#dropdown-menu-order");
    for(let i = 0;i< menu.length;i++){
      menu[i].classList.add("hide");
    }
    // console.log(e.target.innerHTML);
    // console.log(word.innerHTML); 
  };

  function showHideMenuSort(){
    let menu = document.getElementById("dropdown-menu-sort")
      if(menu.classList.contains("hide")){
        menu.classList.remove("hide");
      }else{
        menu.classList.add("hide"); 
    }
  }
  function selectSort(e){
    let sort = document.querySelector("#dropdown-list-sort p");
    sort.textContent = e.target.innerHTML;
    let menu = document.querySelectorAll("#dropdown-menu-sort");
    for(let i = 0;i< menu.length;i++){
      menu[i].classList.add("hide");
    }
    // console.log(e.target.innerHTML);
    // console.log(word.innerHTML); 
  };
  function invisibleDropdownMenu(e){
    let sort = document.getElementById("dropdown-menu-sort")
    if(!e.target.classList.contains("appear")){
        sort.classList.remove("hide");
        console.log(e.target);
    }

  }


  function init(){
   let list = document.getElementById("dropdown-list");
   list.onclick = showHideMenuOrder; 
   let order = document.querySelectorAll(".order");
   for(let i = 0;i< order.length;i++){
    order[i].onclick = selectOrder;
   }
   let listCategory = document.getElementById("dropdown-list-sort")
   listCategory.onclick = showHideMenuSort;
   let sort = document.querySelectorAll(".sort");
   for(let i = 0;i< sort.length;i++){
    sort[i].onclick = selectSort;
   }

  }
  window.addEventListener("load",init,false);