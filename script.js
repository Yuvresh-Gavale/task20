// Services
const services = [
  {
    name: "Washing",
    price: 100,
    image: "https://th.bing.com/th/id/OIP.nT14sdqjOPgR5rMKuLnq7QHaFL?w=241&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
  },
  {
    name: "Dry Cleaning",
    price: 150,
    image: "https://th.bing.com/th/id/OIP.VaaR3ivlkFz9CZuNehK8dQHaE7?w=269&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
  },
  {
    name: "Curtain Wash",
    price: 500,
    image: "https://th.bing.com/th/id/OIP.zvVqaq2swVXYld8NX5S0IAHaEo?w=268&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
  },
  {
    name: "Ironing",
    price: 50,
    image: "https://th.bing.com/th/id/OIP.nMw3uVmbWR5vk7-_o7_5SAHaE8?w=279&h=186&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
  },
  {
    name: "Cleaning",
    price: 200,
    image: "https://th.bing.com/th/id/OIP.yITGLBfcjElc8l_Bo-JtcwHaE8?w=250&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
  },

];

//Left section
const addedItems = document.querySelector(".added-items");
const totalAmount = document.querySelector(".total-amount p");

//Initially no items
let cart = [];

//Right section me services display karna
const serviceContainer = document.querySelector(".box-right");
services.forEach((service) => {
  const serviceBox = document.createElement("div");
  serviceBox.classList.add("service");
  serviceBox.innerHTML = `
    <img src="${service.image}" alt="${service.name}">

    <div class="service-info">
    <h4>${service.name}</h4>
    <p>Price: ₹${service.price}</p>
    </div>

    <div class="service-buttons">
    <button class="add-btn">Add to Cart</button>
    <button class="skip-btn">Skip Items</button>
    </div>
  `;
  serviceContainer.appendChild(serviceBox);

  // Add to cart button
  const addButton = serviceBox.querySelector(".add-btn");
  addButton.addEventListener("click", () => {
    cart.push(service);
    updateCart();
    addButton.textContent = "Added";
    addButton.disabled = true;
  });

  // Skip button
  const skipButton = serviceBox.querySelector(".skip-btn");
  skipButton.addEventListener("click", () => {
    serviceBox.remove();
  });
});

// Cart update function
function updateCart() {
  if (cart.length === 0) {
    addedItems.innerHTML = `
      <h3>Added Items</h3>
      <p>No items have been added.</p>
    `;
    totalAmount.textContent = "";
    return;
  }

  addedItems.innerHTML = `
    <h3>Added Items</h3>
    <ul>
      ${cart
        .map(
          (item, index) => `
            <li>
            <span>
              ${index + 1}. ${item.name} - ₹${item.price}
            </span>

            <button class="remove-btn" data-index="${index}">
            Remove
            </button>
            </li>
          `
        )
        .join("")}
    </ul>
  `;
// Remove item from cart
const removeButtons = document.querySelectorAll(".remove-btn");
removeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const index=button.getAttribute("data-index");
    cart.splice(Number(index), 1);
    updateCart();
  });
});
  //calculate total amount
  const total = cart.reduce((sum, item) => {
    return sum + item.price;
  }, 0);

  //display total
  totalAmount.textContent = `₹${total}`;
}
// Initial cart message
updateCart();

// Booking form
const bookingForm = document.querySelector("#booking-form");
bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();
 

  // Form validation
  if (name === "" || email === "" || password === "") {
    alert("Please fill all the fields.");
    return;
  }

  if (cart.length === 0) {
    alert("Please add at least one service.");
    return;
  }

  alert("Booking submitted successfully!");

  bookingForm.reset();
});


