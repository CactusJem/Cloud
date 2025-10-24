// ==================== IMPORT FIREBASE (v11) ====================
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// ==================== FIREBASE CONFIG ====================
const firebaseConfig = {
  apiKey: "AIzaSyC3yklRlsHHUCwGPRt_NyDuV_MZqwVTqMI",
  authDomain: "coffeeshop-29d03.firebaseapp.com",
  databaseURL: "https://coffeeshop-29d03-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "coffeeshop-29d03",
  storageBucket: "coffeeshop-29d03.firebasestorage.app",
  messagingSenderId: "191436253317",
  appId: "1:191436253317:web:0564b609d1ba4f1ad821ec",
  measurementId: "G-MYPDED2N16",
};

// ==================== INITIALIZE FIREBASE ====================
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ==================== DOM ELEMENTS ====================
const searchBtn = document.getElementById("search-btn");
const cartBtn = document.getElementById("cart-btn");
const menuBtn = document.getElementById("menu-btn");
const searchForm = document.querySelector(".search-form");
const cartItemsContainer = document.querySelector(".cart-items-container");
const navbar = document.querySelector(".navbar");

// ==================== HEADER INTERACTIONS ====================
searchBtn?.addEventListener("click", () => {
  searchForm.classList.toggle("active");
  cartItemsContainer.classList.remove("active");
  navbar.classList.remove("active");
});

cartBtn?.addEventListener("click", () => {
  cartItemsContainer.classList.toggle("active");
  searchForm.classList.remove("active");
  navbar.classList.remove("active");
});

menuBtn?.addEventListener("click", () => {
  navbar.classList.toggle("active");
  searchForm.classList.remove("active");
  cartItemsContainer.classList.remove("active");
});

// Close menus when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".header")) {
    searchForm.classList.remove("active");
    cartItemsContainer.classList.remove("active");
    navbar.classList.remove("active");
  }
});

// ==================== COFFEE STOCK DISPLAY ====================
function loadCoffeeStock() {
  const stockElements = document.querySelectorAll(".stock");
  const stockRef = ref(db, "coffeeStock");

  onValue(stockRef, (snapshot) => {
    const data = snapshot.val();

    if (!data) {
      console.log("[v11] No stock data found in Firebase");
      stockElements.forEach((el) => {
        el.textContent = "No data available";
        el.className = "stock";
      });
      return;
    }

    stockElements.forEach((el) => {
      const bean = el.dataset.bean;
      const stock = data[bean];

      if (stock === undefined) {
        el.textContent = "Stock info unavailable";
        el.className = "stock";
      } else if (stock === 0) {
        el.textContent = "Out of stock";
        el.className = "stock out";
      } else if (stock > 0 && stock <= 5) {
        el.textContent = `Only ${stock} left - Limited stock!`;
        el.className = "stock low";
      } else if (stock > 5) {
        el.textContent = `${stock} in stock`;
        el.className = "stock available";
      }
    });
  });
}

// ==================== ADD TO CART ====================
document.querySelectorAll(".menu .box-container .box .btn, .beans .box-container .box .btn")
  .forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const box = btn.closest(".box");
      const name = box.querySelector("h3").textContent;
      const price = box.querySelector(".price").textContent.split(" ")[0];
      const image = box.querySelector("img").src;

      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
        <img src="${image}" alt="${name}" />
        <div class="content">
          <h3>${name}</h3>
          <div class="price">${price}</div>
        </div>
        <i class="fas fa-times"></i>
      `;

      cartItemsContainer.appendChild(cartItem);

      // Remove item
      cartItem.querySelector(".fa-times").addEventListener("click", () => {
        cartItem.remove();
      });

      cartItemsContainer.classList.add("active");
    });
  });

// ==================== INITIALIZE ====================
document.addEventListener("DOMContentLoaded", () => {
  loadCoffeeStock();
});
