//Get 🌴All categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((err) => {
      console.log(err);
    });
};
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = "";

  for (let category of categories) {
    // console.log(category);

    const createCategory = document.createElement("button");

    createCategory.innerHTML = `
   <button
          id="${category.id}"
          class="w-full grid grid-cols-1 bg-white hover:bg-[#15803d]  text-[#1f2937] text-[16px] rounded text-left py-4 px-[10px]">        
           ${category.category_name}
    </button>
    
    `;
    categoryContainer.append(createCategory);
  }
  categoryContainer.addEventListener("click", (e) => {
    const allButton = document.querySelectorAll("button");

    allButton.forEach((button) => {
      button.classList.remove("category-active");
    });

    if (e.target.localName === "button") {
      lodeSpin();
      e.target.classList.add("category-active");
      loadCategoriesPlants(e.target.id);
    }
  });
};

// Get 🌴plants by categories
const loadCategoriesPlants = (categoryId) => {
  console.log(categoryId);

  fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then((res) => res.json())
    .then((data) => displayAllPlants(data.plants))
    .catch((err) => {
      console.log(err);
    });
};
//  Get 🌴All Plants
const loadPlants = () => {
  fetch(`https://openapi.programming-hero.com/api/plants`)
    .then((res) => res.json())
    .then((data) => displayAllPlants(data.plants))
    .catch((err) => {
      console.log(err);
    });
};

const displayAllPlants = (plants) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  for (let plant of plants) {
    // console.log(plant);
    const createCard = document.createElement("div");
    createCard.innerHTML = `
    <div class="card shadow-sm bg-[#ffffff] p-4 w-full  rounded-lg">
                <figure class="  h-[250px] rounded-lg">
                  <img 
                    class="w-full h-full object-cover object-center" 
                    src="${plant.image}" 
                    alt="image" />
                </figure>
                <div 
                  
                  class="items-center text-left space-y-2 pt-3">
                  <h2 
                  onclick="loadDetails(${plant.id})"
                  class="text-sm font-semibold cursor-pointer">${plant.name}</h2>
                  <p class="text-[#1f2937] text-[16px] text-justify">
                    description
                  </p>
                  <div class="flex items-center justify-between">
                    <button
                      class="px-3 py-1 text-sm font-normal text-[#15803d] bg-[#dcfce7] rounded-full"
                    >
                      ${plant.category}
                    </button>
                    <p class="text-[#1f2937] text-sm font-normal">
                     
                      <span id="card-price">${plant.price}</span>
                    </p>
                  </div>
                  <div
                  id="${plant.id}"
                  class="pt-3">

                    <button
                      
                      
                      class="text-[#ffffff] cart-btn  bg-[#15803d] py-3 px-5 rounded-full w-full"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
    `;
    cardContainer.append(createCard);
  }
};
// modal section
const loadDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayModalPlants(data.plants))
    .catch((err) => {
      console.log(err);
    });
};
const displayModalPlants = (plants) => {
  console.log(plants);
  const getIdModal = document.getElementById("details-container");
  getIdModal.innerHTML = `
              <h1 class="text-2xl font-bold text-left">${plants.name}</h1>
              <img  class="rounded-md w-full h-52" src="${plants.image}" alt="" />
              <h3 class="text-xl font-bold text-left">
              Category: <span class="font-normal">${plants.category}</span></h3>
              <h1 class="text-xl font-bold text-left">
              Price: <span class="font-normal">${plants.price}</span></h1>
              <p class="text-xl font-bold text-justify ">
              description: 
              <span class="font-normal text-justify text-gray-700">
              ${plants.description}</span> </p>
  `;
  document.getElementById("plant_modal").showModal();
};
//cart details
let allCarts = [];
const cardContainer = document.getElementById("card-container");
const cartContainer = document.getElementById("cart-container");
cardContainer.addEventListener("click", (e) => {
  if (e.target.innerText === "Add to Cart") {
    handleCart(e);
  }
});
const handleCart = (e) => {
  const title = e.target.parentNode.parentNode.children[0].innerText;
  const priceTree =
    e.target.parentNode.parentNode.children[2].children[1].innerText;
  const id = e.target.parentNode.id;

  allCarts.push({
    title: title,
    priceTree: priceTree,
    id: id,
  });

  showCart(allCarts);
};

const showCart = (allCarts) => {
  console.log(allCarts);
  let amount = 0;
  allCarts.forEach((price) => {
    amount += Number(price.priceTree);
  });
  document.getElementById("total-taka").innerText = amount;

  cartContainer.innerHTML = "";
  allCarts.forEach((cart) => {
    cartContainer.innerHTML += `
    <div
                  class="w-full flex justify-between items-center py-2 px-3 rounded-lg bg-[#f0fdf4]"
                >
                  <div class="space-y-1">
                    <h1 class="text-sm font-semibold text-[#1f2937]">
                      ${cart.title}
                    </h1>
                    <p class="text-sm font-normal text-gray-500 price">
                    <span>৳</span> <span>${cart.priceTree}</span>  
                      
                    </p>
                  </div>
                  <div>
                    <button
                    onclick="handleDelete(${cart.id})"
                      id="delete"
                      class=" text-xl font-xl text-gray-500 p-1 cursor-pointer"
                    >
                     ❌
                    </button>
                  </div>
                </div>
                
    `;
  });
};
//delete price card
const handleDelete = (cartId) => {
  console.log(cartId);

  const filterCart = allCarts.filter((cart) => cart.id != cartId);
  allCarts = filterCart;

  showCart(allCarts);
};
// lodeSpin
const lodeSpin = () => {
  const loadSpine = document.getElementById("card-container");
  loadSpine.innerHTML = `
  <div class=" absolute top-[-50px] left-[450px] ">
    <span class=" loading loading-dots loading-xl  w-[50px] h-[50px]"></span>
  </div>`;
};
loadCategories();
loadPlants();
