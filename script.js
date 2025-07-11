// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Initialize cart from sessionStorage or create empty
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Render product list
function renderProducts() {
  productList.innerHTML = ""; // Clear previous list
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  // Attach event listeners
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => addToCart(button.dataset.id));
  });
}

// Render cart
function renderCart() {
  cartList.innerHTML = ""; // Clear previous cart
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>`;
    cartList.appendChild(li);
  });

  // Attach remove listeners
  const removeButtons = document.querySelectorAll(".remove-from-cart-btn");
  removeButtons.forEach((btn) => {
    btn.addEventListener("click", () => removeFromCart(btn.dataset.id));
  });
}

// Add to cart
function addToCart(productId) {
  const product = products.find((p) => p.id == productId);
  if (product) {
    cart.push(product); //  Allow duplicates
    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}


// Remove from cart
function removeFromCart(productId) {
  const index = cart.findIndex((item) => item.id == productId);
  if (index !== -1) {
    cart.splice(index, 1); // Remove only one instance
    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}


// Clear cart
function clearCart() {
  cart = [];
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Event listener for Clear Cart
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
