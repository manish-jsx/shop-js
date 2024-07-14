document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));

  const products = [
      {
          id: 1,
          name: "Smart Thermostat",
          price: 99.99,
          description:
              "High-quality smart thermostat with a digital display for efficient home temperature control.",
          image: "../images/smart_thermostat.jpeg",
      },
      {
          id: 2,
          name: "Smart Light Bulb",
          price: 19.99,
          description:
              "Stylish and modern smart light bulb with adjustable brightness and color settings.",
          image: "../images/smart_light_bulb.jpeg",
      },
      {
          id: 3,
          name: "Smart Door Lock",
          price: 149.99,
          description:
              "Secure smart door lock with a keypad and fingerprint sensor for enhanced security.",
          image: "../images/smart_door_lock.jpeg",
      },
      {
          id: 4,
          name: "Smart Security Camera",
          price: 79.99,
          description:
              "Compact and stylish smart security camera with night vision and motion detection.",
          image: "../images/smart_security_camera.jpeg",
      },
      {
          id: 5,
          name: "Smart Plug",
          price: 14.99,
          description:
              "Minimalistic smart plug that can be controlled via a smartphone app for convenient power management.",
          image: "../images/smart_plug.jpeg",
      },
      {
          id: 6,
          name: "Smart Speaker",
          price: 49.99,
          description:
              "High-quality smart speaker with voice assistant capability and modern design.",
          image: "../images/smart_speaker.jpeg",
      },
      {
          id: 7,
          name: "Smart Smoke Detector",
          price: 39.99,
          description:
              "Sleek smart smoke detector with carbon monoxide detection and smartphone alerts for enhanced safety.",
          image: "../images/smart_smoke_detector.jpeg",
      },
  ];

  const product = products.find((p) => p.id === productId);
  if (product) {
      const productDetails = document.getElementById("product-details");
      productDetails.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <div class="product-info">
              <h2>${product.name}</h2>
              <p>${product.description}</p>
              <p id="product-price">$${product.price.toFixed(2)}</p>
              <button id="add-to-cart">Add to Cart</button>
          </div>
      `;

      // Event listener for Add to Cart button
      const addToCartBtn = document.getElementById('add-to-cart');
      addToCartBtn.addEventListener('click', function() {
          addToCart(product);
      });
  }

  // Initialize cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Function to update cart and display modal
  function addToCart(product) {
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart)); // Update cart in localStorage
      displayCartModal();
  }

  // Function to display modal with cart details
  function displayCartModal() {
      // Get modal elements
      const modal = document.getElementById('cart-modal');
      const modalContent = document.querySelector('.modal-content');
      const closeBtn = document.querySelector('.close');
      const cartItemsDiv = document.getElementById('cart-items-modal');
      const cartTotalSpan = document.getElementById('cart-total-modal');

      // Clear previous content
      cartItemsDiv.innerHTML = '';

      // Iterate through cart items and display
      let total = 0;
      cart.forEach(item => {
          const itemDiv = document.createElement('div');
          itemDiv.classList.add('cart-item-modal');
          itemDiv.innerHTML = `
              <p>${item.name}</p>
              <p>$${item.price.toFixed(2)}</p>
          `;
          cartItemsDiv.appendChild(itemDiv);

          // Calculate total
          total += item.price;
      });

      // Display total amount
      cartTotalSpan.textContent = total.toFixed(2);

      // Display the modal
      modal.style.display = 'block';

      // Close modal when close button or outside modal area is clicked
      closeBtn.addEventListener('click', () => {
          modal.style.display = 'none';
      });

      window.addEventListener('click', (event) => {
          if (event.target === modal) {
              modal.style.display = 'none';
          }
      });

      // Add Continue Shopping button
      const continueShoppingBtn = document.createElement('button');
      continueShoppingBtn.textContent = 'Continue Shopping';
      continueShoppingBtn.addEventListener('click', () => {
          modal.style.display = 'none'; // Close the modal
          // Implement your continue shopping logic here
          window.location.href = '../pages/marketplace.html'; // Example: Redirect to home page
      });
      modalContent.appendChild(continueShoppingBtn);

      // Implement checkout button functionality
      const checkoutBtn = document.getElementById('checkout-btn');
      checkoutBtn.addEventListener('click', () => {
          // Redirect to checkout page
          window.location.href = '../pages/checkout.html';
      });
  }
});
