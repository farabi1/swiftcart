const categoryContainer = document.getElementById("categoryContainer");
const productContainer = document.getElementById("productContainer");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");

async function loadCategories() {

    const res = await fetch("https://fakestoreapi.com/products/categories");
    const categories = await res.json();
}