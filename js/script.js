let navbar = document.querySelector('.navbar');
let menuBtn = document.getElementById('menu-btn');

menuBtn.addEventListener('click',()=>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
})

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}

let cartItem = document.querySelector('.cart-items-container');

document.querySelector('#cart-btn').onclick = () =>{
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}
document.addEventListener("DOMContentLoaded", () => {
    const stockElements = document.querySelectorAll(".stock");
  
    stockElements.forEach(el => {
      const bean = el.getAttribute("data-bean");
  
      fetch(`https://<YOUR_CLOUD_FUNCTION_URL>?bean=${bean}`)
        .then(response => response.json())
        .then(data => {
          el.textContent = `In Stock: ${data.stock}`;
        })
        .catch(err => {
          el.textContent = "Stock info unavailable";
          console.error(err);
        });
        if (data.stock === 0) {
            el.textContent = "Out of stock";
            el.classList.add("out");
          } else {
            el.textContent = `In Stock: ${data.stock}`;
          }
          
    });
  });
document.querySelectorAll('.stock[data-bean]').forEach(el => {
    const bean = el.dataset.bean;
  
    fetch(`https://coffee-stock-api-138397998981.europe-west1.run.app/?bean=${bean}`)
      .then(res => res.json())
      .then(data => {
        if (data.stock !== undefined) {
          el.textContent = `In stock: ${data.stock}`;
        } else {
          el.textContent = 'Out of stock';
        }
      })
      .catch(err => {
        el.textContent = 'Error loading stock';
        console.error(`Failed to load stock for ${bean}:`, err);
      });
  });
   
  