
// I want to take the values from the user and to store them 
// a- select the element globally to be able to use them in any other scope if I need
var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var sumbitBtn=  document.getElementById("sumbitBtn");
var updateBtn=  document.getElementById("updateBtn");
var visitBtn= document.getElementById("visitBtn");
 var siteInfo= document.getElementById("siteInfo");

// then I will use a function and its calling to do my task
// first i will select the values of the sites locally in this function.
// then put their desc in an object:
// before that i will put a shelf to have all sites through an array:
var allSites=[];
var indexUpdate= 0;
if(localStorage.getItem("allSites") !== null){
   allSites= JSON.parse(localStorage.getItem("allSites")) 
   displayUserData()
};



function addSite(){
// console.log("added..."); to make sure it is working
if(validateSite() && validateUrl()==true){
    var site={
        
        name: siteNameInput.value,
        path: siteUrlInput.value,
    };
    allSites.push(site);
    localStorage.setItem("allSites", JSON.stringify(allSites));
    
    console.log(allSites);
    
       
       
       displayUserData();
    
       clearUserData();
       
}
else{
    siteNameInput.style.color="red";
    siteNameInput.style.borderColor="red";
    siteUrlInput.style.color="red";
    siteUrlInput.style.borderColor="red";
    siteNameInput.classList.add("is-invalid");
    siteUrlInput.classList.add("is-invalid");
   siteInfo.classList.remove("d-none");
   siteInfo.classList.add("d-block");
   clearUserData();
}
};
    
      
 //fuction to clear the data for user for user experience:
function clearUserData(){
    siteNameInput.value="";
    siteUrlInput.value="";
}


// to display the values for the user (read) I have to show them in a table or grid system:
// so, i have to do a seperate function for display(seperation of concerns)
function displayUserData(){
    var container=""
    for( var i=0  ; i<allSites.length; i++){
        container+=` <tr>
        <td>${i+1}</td>
        <td>${allSites[i].name}</td>
        <td>
        <button id=visitBtn   class="btn btn-success" onclick="visitLink(${i})">
        <span><i class="fa-solid fa-eye me-2" style="color: #ffffff;"></i></span>
        visit</button>
        </td>
       
        <td>
        <button class="btn btn-danger" onclick="deleteUserData(${i})">
        <span><i class="fa-solid fa-delete-left me-2" style="color: #ffffff;"></i></span>
        Delete</button>
        </td>
        <td>
        <button class="btn btn-dark update" onclick="setUserData(${i})">
        <span><i class="fa-solid fa-arrows-rotate me-2" style="color: #ffffff;"></i></span>
        update</button> 
        </td>

    </tr>`
    };
   
    document.getElementById("userSites").innerHTML= container;
  

};
function visitLink(i){
    // console.log("visited...");
    window.open(allSites[i].path);
};

function deleteUserData(index){
//  console.log("delete");
 allSites.splice(index , 1);
 localStorage.setItem("allSites", JSON.stringify(allSites));

 displayUserData();
 
 
};
 
function setUserData(i){
    // console.log("updated...");
   indexUpdate= i;
   siteNameInput.value= allSites[i].name;
   siteUrlInput.value=allSites[i].path;
   
    
    updateBtn.classList.remove("d-none");
    sumbitBtn.classList.add("d-none");  
};

function updateTheSite(){
    var site={
        name: siteNameInput.value,
        path: siteUrlInput.value,
    };
   
    allSites.splice(indexUpdate,1,site );
    localStorage.setItem("allSites", JSON.stringify(allSites));
    updateBtn.classList.add("d-none");
    sumbitBtn.classList.remove("d-none");  
    displayUserData();
    clearUserData();

};
 function validateSite(){
    var siteRegex= /^[a-z][a-z]{3,10}$/gm;
    var siteInput=  siteRegex.test(siteNameInput.value);
    if(siteInput==true){
        siteNameInput.style.color="green";
        siteNameInput.style.borderColor="green"; 
        siteNameInput.classList.add("is-valid"); 
    return true;
    }
    else{
       
        return false;
    }
   
 };
 function validateUrl(){
    
    var urlRegex= /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var urlInput=  urlRegex.test(siteUrlInput.value);
    if(urlInput==true){
        siteUrlInput.style.color="green";
        siteUrlInput.style.borderColor="green";
        siteUrlInput.classList.add("is-valid");
        return true;
    }
    else{
       
        return false;
    }
    

    
    
 };



