// This is the boilerplate code given for you
// You can modify this code
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
const clearCartBtn = document.getElementById("clear-cart-btn");

// Initialize cart from sessionStorage, or create an empty cart
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
	 const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => addToCart(button.dataset.id));
  });
}

// Render cart list
function renderCart() {
	cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>`;
    cartList.appendChild(li);
  });

  // Add event listeners to "Remove" buttons
  const removeFromCartButtons = document.querySelectorAll(".remove-from-cart-btn");
  removeFromCartButtons.forEach((button) => {
    button.addEventListener("click", () => removeFromCart(button.dataset.id));
  });
}

// Add item to cart
function addToCart(productId) {
	const product = products.find((p) => p.id == productId);
  if (product && !cart.some((item) => item.id == productId)) {
    cart.push(product);
    sessionStorage.setItem("cart", JSON.stringify(cart)); // Save cart to sessionStorage
    renderCart(); // Update the cart display
  }
}

// Remove item from cart
function removeFromCart(productId) {
	cart = cart.filter((item) => item.id != productId);
  sessionStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart to sessionStorage
  renderCart(); 
}

// Clear cart
function clearCart() {
	cart = []; // Empty the cart array
  sessionStorage.setItem("cart", JSON.stringify(cart)); // Clear cart in sessionStorage
  renderCart();
}
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
