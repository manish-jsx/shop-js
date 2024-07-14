document.addEventListener('DOMContentLoaded', () => {
  const openCartModalBtn = document.getElementById('open-cart-modal');

  if (openCartModalBtn) {
      openCartModalBtn.addEventListener('click', (event) => {
          event.preventDefault();
          displayCartModal();
      });
  }

  function displayCartModal() {
      // Define the modal HTML template as a string
      const modalHTML = `
          <div id="cart-modal" class="modal">
              <div class="modal-content">
                  <span class="close">&times;</span>
                  <h2>Your Shopping Cart</h2>
                  <div id="cart-items-modal"></div>
                  <p>Total: $<span id="cart-total-modal">0.00</span></p>
                  <div class="modal-buttons">
                      <button id="continue-shopping-btn">Continue Shopping</button>
                      <button id="checkout-btn">Checkout</button>
                  </div>
              </div>
          </div>
      `;

      // Append modal HTML to the body
      document.body.insertAdjacentHTML('beforeend', modalHTML);

      // Get modal elements
      const modal = document.getElementById('cart-modal');
      const modalContent = document.querySelector('.modal-content');
      const closeBtn = document.querySelector('.close');
      const cartItemsDiv = document.getElementById('cart-items-modal');
      const cartTotalSpan = document.getElementById('cart-total-modal');

      // Check if modal and its content exist
      if (!modal || !modalContent || !closeBtn || !cartItemsDiv || !cartTotalSpan) {
          console.error('One or more modal elements not found.');
          return;
      }

      // Retrieve cart items from localStorage or initialize as empty array
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

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

      // Continue Shopping button functionality
      const continueShoppingBtn = document.getElementById('continue-shopping-btn');
      continueShoppingBtn.addEventListener('click', () => {
          modal.style.display = 'none'; // Close the modal
          // Implement your continue shopping logic here
          // Example: window.location.href = 'index.html';
      });

      // Implement checkout button functionality
      const checkoutBtn = document.getElementById('checkout-btn');
      checkoutBtn.addEventListener('click', () => {
          // Redirect to checkout page or implement checkout logic
          // Example: window.location.href = 'pages/checkout.html';
      });

      // Update cart count in navbar
      updateCartCount();
  }

  // Function to update cart count dynamically in navbar
  function updateCartCount() {
      const cartCountSpan = document.getElementById('cart-count');
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cartCountSpan.textContent = cart.length;
  }
  updateCartCount()
});
