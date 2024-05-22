
let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");


// Problem 1. List of pitches on page load 

let productdata=[]

function fetchdata() {
    fetch("https://js-project-json-server.onrender.com/pitches")
      .then((res) => res.json())
      .then((data) =>{
        productdata=data
        cardList(data)
      })
      .catch((err) => console.log(err));
  }
  fetchdata();
  
  
  function cardList(data) {
    let store = data.map((el) =>
      SingleCard(el.title, el.price, el.founder, el.category, el.image, el.id ,el.description)
    );
    mainSection.innerHTML = store.join("");
  }
  
  
  function SingleCard(title, price, founder, category, image, id , description) {
    let card = `<div class="card" data-id=${id}>
    <a href="dec.html?title=${encodeURIComponent(
      title
    )}
    &price=${encodeURIComponent(price)}
    &founder=${encodeURIComponent(founder)}
    &category=${encodeURIComponent(category)}
    &image=${encodeURIComponent(image)}
    &description=${encodeURIComponent(description)}">
    <div class="card-img">
      <img src=${image} alt=${title}>
    </div>
    <div class="card-body">
      <h4 class="card-title">${title}</h4>
      <p class="card-founder">Founder:${founder}</p>
      <p class="card-category">${category}</p>
      <p class="card-price">${price}</p>
      <a href="#" data-id=${id} class="card-link">Edit</a>
      <button data-id=${id} class="card-button">Delete</button>
    </div>
  </div>`;
    return card;
  }
  
  
  // ####### POST(Add) Data Into Server
  
  
  pitchCreateBtn.addEventListener("click", () => {
    const title = pitchTitleInput.value;
    const price = pitchPriceInput.value;
    const founder = pitchfounderInput.value;
    const category = pitchCategoryInput.value;
    const image = pitchImageInput.value;
    // const Description = pitchDescriptionInput.value;
  
  
    let product = {
      title,
      price,
      founder,
      category,
      image,
  
    };
    // console.log(product)
  
  
    fetch("https://js-project-json-server.onrender.com/pitches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchdata();
        alert("Data Added ...");
      })
      .catch((err) => {
        console.log(err);
        alert("something went Wrong");
      });

     
  
  });
  
  
  // ######## DELTE PART ########
  
  
  document.addEventListener("click", (e) => {
    let id = e.target.dataset.id
     if(e.target.classList.contains("card-button")){
      DeleteFun(id)
     }
     
    });


    function DeleteFun(id){
      fetch(`https://js-project-json-server.onrender.com/pitches/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          fetchdata();
          alert("Data Deleted ...");
        })
        .catch((err) => {
          console.log(err);
        });
    }

// filter food

filterFood.addEventListener("click",()=>{
    let filterFooddata = productdata.filter((el)=>el.category==="Food");

    cardList(filterFooddata);
});

//filter Electronics

filterElectronics.addEventListener("click",()=>{
    let filterElectronicsdata = productdata.filter((el)=>el.category==="Electronics");

    cardList(filterElectronicsdata);
});
//filter filterPersonalCaredata

filterPersonalCare.addEventListener("click",()=>{
    let filterPersonalCaredata = productdata.filter((el)=>el.category==="Personal Care");

    cardList(filterPersonalCaredata);
});
//sorting part 
sortAtoZBtn.addEventListener("click",()=>{
  let sortAtoZdata = productdata.sort((a,b)=>a.price-b.price)
  cardList(sortAtoZdata)
 })

 sortZtoABtn.addEventListener("click",()=>{
  let sortZtoABtn = productdata.sort((a,b)=>b.price-a.price)
  cardList(sortZtoABtn)
 })

 // update part
 document.addEventListener("click",(e)=>{
   if(e.target.classList.contains("card-link")){
    let id = e.target.dataset.id;
    populateForm(id)
   }
 })

 //populate form
 function populateForm(id){
  fetch(`https://js-project-json-server.onrender.com/pitches/${id}`)
  .then((res)=>res.json())
  .then((data)=>{
    updatePitchIdInput.value=data.id;
    updatePitchTitleInput.value=data.title;
    updatePitchImageInput.value=data.image;
    updatePitchfounderInput.value=data.founder;
    updatePitchCategoryInput.value=data.category;
    updatePitchPriceInput.Input.value=data.price;

  })
   .catch((err)=>console.log(err))
 }
 //put part
 updatePitchBtn.addEventListener("click",()=>{
   let updateData={
    title:updatePitchTitleInput.value,
    image:updatePitchImageInput.value,
    founder:updatePitchfounderInput.value,
    category:updatePitchCategoryInput.value,
    price:updatePitchPriceInput.value,
    id: updatePitchIdInput.value,
   }
   fetch(`https://js-project-json-server.onrender.com/pitches/${updateData.id}`,{
   
    method:"PUT",
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify(updateData),
   })
   .then((res)=>res.json())
   .then((data)=>{
    alert("data upadte...");
   })
   .catch((err)=>console.log(err));


})

//patch part
updatePricePitchPriceButton.addEventListener("click",()=>{
  let updateData={
  
   price:updatePricePitchPrice.value,
   id: updatePricePitchId.value,
  }
  fetch(`https://js-project-json-server.onrender.com/pitches/${updateData.id}`,{
  
   method:"PATCH",
   headers:{
     "Content-Type":"application/json",
   },
   body:JSON.stringify(updateData),
  })
  .then((res)=>res.json())
  .then((data)=>{
   alert("Data upadte...");
  })
  .catch((err)=>console.log(err));


})

