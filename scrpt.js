







let submitBtn=document.querySelector('.submit-btn');
let addressDetails=document.querySelector('.address-details');
let addressValues=document.querySelector('.address-values');
let loadingWindow=document.querySelector('.loading-window');
let names_lists=document.querySelector('.names-list');


let form=document.querySelector('.myForm');
let s_name=document.querySelector('#sname');
let f_name=document.querySelector('#fname');
let email=document.querySelector('#email');
let reg_no=document.querySelector('#regno');
let phone_no=document.querySelector('#phone-no');



let add_new_btn=document.querySelector('.add-new');
let alert_container=document.querySelector('.alert-container');
let clearBtn=document.querySelector('.clear-details');

let databaseBtn=document.querySelector('.database');


let editId="";

let editElement1;
let editFlag1=false;

let editElement2;
let editFlag2=false;

let editElement3;
let editFlag3=false;

let editElement4;
let editFlag4=false;

let editElement5;
let editFlag5=false;


databaseBtn.addEventListener('click',()=>{
  databaseBtn.classList.add('hide-database');

  addressDetails.classList.add('adress-active');
  addressValues.classList.add('adress-active');

  addressDetails.classList.add('show-load');
  addressValues.classList.add('show-load');
  loadingWindow.classList.add('show-load');
  let loadTimeout=setTimeout(()=>{
    addressDetails.classList.remove('show-load');
    addressValues.classList.remove('show-load');
    loadingWindow.classList.remove('show-load');
  },1500)
})



form.addEventListener('submit',updateDetails);

function updateDetails(e){
    e.preventDefault();

    let id=new Date().getTime().toString();

    let fname_value=f_name.value;
    let sname_value=s_name.value;
    let email_value=email.value;
    let regno_value=reg_no.value;
    let phone_value=phone_no.value;


    if(fname_value !== "" && sname_value !=="" && email_value !=="" && regno_value !=="" && phone_value !=="" &&  !editFlag1 && !editFlag2 && !editFlag3 && !editFlag4 && !editFlag5){

      let element=document.createElement('article');
      element.classList.add('individual-element');


      let attr=document.createAttribute('data-id');
      attr.value=id;
      element.setAttributeNode(attr);

      element.innerHTML=`
          <p>${fname_value}</p>
          <p>${sname_value}</p>
          <p>${email_value}</p>
          <p>${regno_value}</p>
          <p>${phone_value}</p>
          <div class="btns-container">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
          </div
      `

      add_new_btn.addEventListener('click',returningAdd);

      databaseBtn.classList.add('hide-database');

      let delete_btn=element.querySelector('.delete-btn');
      delete_btn.addEventListener('click',deleteDetails);

      clearBtn.addEventListener('click',clear_all_items);


      let edit_btn=element.querySelector('.edit-btn');
      edit_btn.addEventListener('click',editDetails);

      

      clearBtn.classList.add('show-clear');

       names_lists.appendChild(element);
       alertDisplay("Details added","success");
       set_local_storage(id,fname_value,sname_value,email_value,regno_value,phone_value);
       set_back_defaults();
       
  

    }else if(fname_value !== "" && sname_value !=="" && email_value !=="" && regno_value !=="" && phone_value !=="" &&  editFlag1 && editFlag2 && editFlag3 && editFlag4 && editFlag5){
          editElement5.innerHTML=fname_value;
          editElement4.innerHTML=sname_value;
          editElement3.innerHTML=email_value;
          editElement2.innerHTML=regno_value;
          editElement1.innerHTML=phone_value;



          edit_local_storage(editId,fname_value,sname_value,email_value,regno_value,phone_value);
        
          alertDisplay("Details updated","success");
          set_back_defaults();
    
    }else{
      alertDisplay('details is needed','danger');
      set_back_defaults();
    }






    /**ADDING FUNCTIONALITY TO THE LOADING WINDOW */
    addressDetails.classList.add('adress-active');
      addressValues.classList.add('adress-active');

      databaseBtn.classList.add('hide-database');

      addressDetails.classList.add('show-load');
      addressValues.classList.add('show-load');
      loadingWindow.classList.add('show-load');

      let loadTimeout=setTimeout(()=>{
        addressDetails.classList.remove('show-load');
        addressValues.classList.remove('show-load');
        loadingWindow.classList.remove('show-load');
      },1500)

}



function showError(input,message){
  let miniCont=input.parentElement;
  miniCont.classList.add('error');
  let small=miniCont.querySelector('small');
  small.innerHTML=message;

}

function showSuccess(input){
  let miniCont=input.parentElement;
  miniCont.classList.add('success');
}


function alertDisplay(message,action){
     alert_container.innerHTML=message
     alert_container.classList.add(`alert-${action}`);

     let alertDisplaytime=setTimeout(()=>{
      alert_container.innerHTML=""
      alert_container.classList.remove(`alert-${action}`);
     },3500)
}





function deleteDetails(e){
  let curr=e.currentTarget.parentElement.parentElement;

  names_lists.removeChild(curr);

  if(names_lists.children.length === 0){
    addressDetails.classList.remove('adress-active');
    clearBtn.classList.remove('show-clear');
      addressValues.classList.remove('adress-active');
      databaseBtn.classList.remove('hide-database');
  }

  alertDisplay('Details removed','danger');

  let ele=e.currentTarget.parentElement.parentElement;
  let ele_id=ele.dataset.id;
  delete_local_storage(ele_id);
  
}

function clear_all_items(){
  let individualEl=document.querySelectorAll('.individual-element');
  individualEl.forEach((elemement)=>{
    names_lists.removeChild(elemement);

    if(names_lists.children.length === 0){
      addressDetails.classList.remove('adress-active');
      clearBtn.classList.remove('show-clear');
        addressValues.classList.remove('adress-active');

        databaseBtn.classList.remove('hide-database');
    }

  })

  localStorage.removeItem('list');

}


function returningAdd(){
  addressDetails.classList.remove('adress-active');
  addressValues.classList.remove('adress-active');
  databaseBtn.classList.remove('hide-database');

  if(names_lists.children.length === 0){
    addressDetails.classList.remove('adress-active');
    addressValues.classList.remove('adress-active');
  }
}



function editDetails(e){

  

  addressDetails.classList.remove('adress-active');
  addressValues.classList.remove('adress-active');



  editElement1=e.currentTarget.parentElement.previousElementSibling;

  editElement2=e.currentTarget.parentElement.previousElementSibling.previousElementSibling;

  editElement3=e.currentTarget.parentElement.previousElementSibling.previousElementSibling.previousElementSibling;

  editElement4=e.currentTarget.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling;

  editElement5=e.currentTarget.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling;

  
  editFlag1=true;
  editFlag2=true;
  editFlag3=true;
  editFlag4=true;
  editFlag5=true;
 
  f_name.value=editElement5.innerHTML;
  s_name.value=editElement4.innerHTML;
  email.value=editElement3.innerHTML;
  reg_no.value=editElement2.innerHTML;
  phone_no.value=editElement1.innerHTML;


 submitBtn.innerHTML="Edit";

 let cuurT=e.currentTarget.parentElement.parentElement;
 let curr_id=cuurT.dataset.id;

 editId=curr_id;

 console.log(editId);

 databaseBtn.classList.remove('hide-database');

}




function set_back_defaults(){
  s_name.value="";
  f_name.value="";
  email.value="";
  reg_no.value="";
  phone_no.value="";

  editFlag1=false;
  editFlag2=false;
  editFlag3=false;
  editFlag4=false;
  editFlag5=false;

  submitBtn.innerHTML="Submit";

  editId="";
}
































/**SETTING UP THE LOCAL STORAGE */


function set_local_storage(id,value1,value2,value3,value4,value5){
  let indItems={id,value1,value2,value3,value4,value5}
    let items=get_local_storage();
    items.push(indItems);

    localStorage.setItem('list',JSON.stringify(items));
}

function get_local_storage(){
  return  localStorage.getItem('list')
  ? JSON.parse(localStorage.getItem('list')):[];
}

function delete_local_storage(id){
      let items=get_local_storage();
      items=items.filter((item)=>{
          if(item.id !== id){
            return item
          }
      })

      localStorage.setItem('list',JSON.stringify(items))
}




function edit_local_storage(id,vall1,vall2,vall3,vall4,vall5){
  let items=get_local_storage();
  items=items.map((item)=>{
       if(item.id === id){
        item.value1=vall1;
        item.value2=vall2;
        item.value3=vall3;
        item.value4=vall4;
        item.value5=vall5;
       }
       return item
  })

  localStorage.setItem('list',JSON.stringify(items));
}
















/**MAPPING THE ITEMS FROM THE LOCAL STORAGE */

window.addEventListener('DOMContentLoaded',set_up_items)

function set_up_items(){
  let items=get_local_storage();

  items=items.forEach((item)=>{
      setting_items(item.id,item.value1,item.value2,item.value3,item.value4,item.value5)
  })
}

function setting_items(id,val1,val2,val3,val4,val5){
      
  let element=document.createElement('article');
  element.classList.add('individual-element');
  let attr=document.createAttribute('data-id');
  attr.value=id;
  element.setAttributeNode(attr);

  element.innerHTML=`
      <p>${val1}</p>
      <p>${val2}</p>
      <p>${val3}</p>
      <p>${val4}</p>
      <p>${val5}</p>
      <div class="btns-container">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div
  `

  add_new_btn.addEventListener('click',returningAdd)

  let delete_btn=element.querySelector('.delete-btn');
  delete_btn.addEventListener('click',deleteDetails);


  let edit_btn=element.querySelector('.edit-btn');
  edit_btn.addEventListener('click',editDetails);

  clearBtn.addEventListener('click',clear_all_items);

  databaseBtn.classList.add('hide-database');

  clearBtn.classList.add('show-clear');

   names_lists.appendChild(element);
   alertDisplay("Details added","success");
  
}