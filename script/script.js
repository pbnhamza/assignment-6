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
          class="w-full bg-white  text-[#1f2937] text-[16px] rounded text-left py-4 px-[10px]   ">        
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
loadCategories();

// lodeSpin
const lodeSpin = () => {
  const loadSpine = document.getElementById("card-container");
  loadSpine.innerHTML = `
  <div class="flex justify-center absolute top-[-32px]">
    <span class="loading loading-spinner text-success w-[50px] h-[50px]"></span>
  </div>`;
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
loadPlants();
const displayAllPlants = (plants) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  for (let plant of plants) {
    const createCard = document.createElement("div");
    createCard.innerHTML = `
    <div class="card shadow-sm  bg-[#ffffff] p-4 md:w-80  rounded-lg">
                <figure class="  h-[250px] rounded-lg">
                  <img 
                    class="w-full h-full" 
                    src="${plant.image}" 
                    alt="image" />
                </figure>
                <div class="items-center text-left space-y-2 pt-3">
                  <h2 class="text-sm font-semibold">${plant.name}</h2>
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
                      ৳
                      <span id="card-price">${plant.price}</span>
                    </p>
                  </div>
                  <div
                  id="cart"
                  class="pt-3">

                    <button
                      onclick="cartBtn()"
                      id="cart-btn"
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
let amount = 0;
// cart price
const cartBtn = () => {
  const cardPrice = document.querySelectorAll(".cart-btn");
  cardPrice.forEach((item) => {
    console.log(item);
  });
};
