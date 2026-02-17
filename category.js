const categoryContainer = document.getElementById("categoryContainer");
const productContainer = document.getElementById("productContainer");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");

async function loadCategories() {

    const res = await fetch("https://fakestoreapi.com/products/categories");
    const categories = await res.json();
   createCategoryBtn("all");

    categories.forEach(category => {
        createCategoryBtn(category);
    }); 
}

function createCategoryBtn(name){

    const btn = document.createElement("button");

    btn.innerText = name;

    btn.className =
    "px-4 py-2 bg-slate-200 hover:bg-indigo-500 hover:text-white rounded";

    btn.onclick = () => {
        if(name==="all") loadProducts();
        else loadProductsByCategory(name);
    };

    categoryContainer.appendChild(btn);
}


async function loadProducts(){

    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    showProducts(data);
}


async function loadProductsByCategory(category){

    const res = await fetch(
        `https://fakestoreapi.com/products/category/${category}`
    );

    const data = await res.json();

    showProducts(data);
}


function showProducts(products){

    productContainer.innerHTML="";

    products.forEach(p=>{

        const card = document.createElement("div");

        card.className =
        "bg-white rounded-xl shadow p-4 flex flex-col";

        card.innerHTML = `

    <img src="${p.image}" class="h-60 w-full object-contain">

    <!-- CATEGORY + RATING ROW -->
    <div class="flex justify-between items-center mt-4">

        
        <span class="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full">
            ${p.category}
        </span>

        <!-- STAR + NUMBER -->
        <div class="flex items-center gap-1">

            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-yellow-400" viewBox="0 0 20 20"
                fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921
                1.902 0l1.07 3.292a1 1 0 00.95.69h3.462
                c.969 0 1.371 1.24.588 1.81l-2.8
                2.034a1 1 0 00-.364 1.118l1.07
                3.292c.3.921-.755 1.688-1.54
                1.118l-2.8-2.034a1 1 0 00-1.176
                0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118
                l1.07-3.292a1 1 0 00-.364-1.118L2.98
                8.72c-.783-.57-.38-1.81.588-1.81h3.461
                a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>

            <span class="text-sm text-gray-600">${p.rating.rate}</span>

        </div>
    </div>

    <!-- TITLE -->
    <h3 class="mt-3 font-semibold">
        ${p.title.length > 40 ? p.title.substring(0, 40) + "..." : p.title}
    </h3>

    <p class="text-indigo-600 font-bold mt-2">$${p.price}</p>

    <div class="flex gap-3 mt-4">
        <button onclick="showDetails(${p.id})" class="flex-1 border rounded-lg py-2 
               hover:bg-indigo-50 hover:border-indigo-600 
               transition-colors duration-200flex-1 border rounded-lg py-2 
               hover:bg-indigo-50 hover:border-indigo-600 
               transition-colors duration-200">Details</button>
        <button class="flex-1 bg-indigo-600 text-white rounded-lg py-2">
            Add To Cart
        </button>
    </div>

`;


        productContainer.appendChild(card);
    });

}

async function showDetails(id){

    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const p = await res.json();

    modalContent.innerHTML = `
        <img src="${p.image}" class="h-52 mx-auto object-contain">

        <h2 class="text-xl font-bold mt-4">${p.title}</h2>

        <p class="mt-3 text-gray-600">${p.description}</p>

        <p class="font-bold text-indigo-600 mt-4">$${p.price}</p>

        <p>⭐ ${p.rating.rate}</p>

        <button class="mt-4 w-full bg-indigo-600 text-white py-3 rounded">
        Buy Now
        </button>
    `;

    modal.classList.remove("hidden");
    modal.classList.add("flex");
}


function closeModal(){

    modal.classList.add("hidden");
}
// Trending Section

const trendingGrid = document.getElementById("trendingGrid");

// Fetch all products
fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(products => {
        
        // Sort by rating (highest first)
        products.sort((a, b) => b.rating.rate - a.rating.rate);

        // Take top 3
        const topProducts = products.slice(0, 3);

        // Render cards
        topProducts.forEach(p => {
            const card = document.createElement("div");
            card.className = "bg-white rounded-xl shadow p-4";

            card.innerHTML = `
                <img src="${p.image}" class="h-60 w-full object-contain">

                <!-- CATEGORY + RATING ROW -->
                <div class="flex justify-between items-center mt-4">

                    <!-- CATEGORY BADGE -->
                    <span class="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full">
                        ${p.category}
                    </span>

                    <!-- STAR + NUMBER -->
                    <div class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-yellow-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921
                            1.902 0l1.07 3.292a1 1 0 00.95.69h3.462
                            c.969 0 1.371 1.24.588 1.81l-2.8
                            2.034a1 1 0 00-.364 1.118l1.07
                            3.292c.3.921-.755 1.688-1.54
                            1.118l-2.8-2.034a1 1 0 00-1.176
                            0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118
                            l1.07-3.292a1 1 0 00-.364-1.118L2.98
                            8.72c-.783-.57-.38-1.81.588-1.81h3.461
                            a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>

                        <span class="text-sm text-gray-600">${p.rating.rate}</span>
                    </div>
                </div>

                <!-- TITLE -->
                <h3 class="mt-3 font-semibold">
                    ${p.title.length > 40 ? p.title.substring(0,40) + "..." : p.title}
                </h3>

                <p class="text-indigo-600 font-bold mt-2">$${p.price}</p>

                <div class="flex gap-3 mt-4">
                    <button onclick="showDetails(${p.id})" class="flex-1 border rounded-lg py-2 
               hover:bg-indigo-50 hover:border-indigo-600 
               transition-colors duration-200">Details</button>
                    <button class="flex-1 bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 transition-colors duration-200">
                    Add To Cart
                    </button>
                </div>
            `;

            trendingGrid.appendChild(card);
        });
    });



loadCategories();
loadProducts();




