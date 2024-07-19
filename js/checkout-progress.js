document.addEventListener('DOMContentLoaded', () => {
	const checkoutSteps = document.getElementById('checkout-steps');
	const cartItemsDiv = document.getElementById('cart-items');
	const totalAmountSpan = document.getElementById('total-amount');
	const prevStepBtn = document.getElementById('prev-step-btn');
	const nextStepBtn = document.getElementById('next-step-btn');
	const progressBar = document.querySelector('.pBar');
	const nodes = document.querySelectorAll('.node');
	let currentStep = 1;

	// Initial checkout step and cart display
	displayCheckoutStep(currentStep);

	// Function to display checkout steps
	function displayCheckoutStep(stepNumber) {
		let stepHTML = '';
		switch (stepNumber) {
			case 1:
				stepHTML = `
					<h2>Step 1: Shipping Information</h2>
					<form id="shipping-form">
						<label for="name">Name:</label>
						<input type="text" id="name" name="name" required>
						<label for="address">Address:</label>
						<input type="text" id="address" name="address" required>
						<button type="submit">Next</button>
					</form>
					<p>Next Step: Review Order</p>
				`;
				prevStepBtn.classList.add('disabled');
				nextStepBtn.textContent = 'Next Step: Review Order';
				break;
			case 2:
				stepHTML = `
					<h2>Step 2: Review Order</h2>
					<div id="order-summary">
						<!-- Order summary will be dynamically added here -->
					</div>
					<button id="confirm-order-btn">Confirm Order</button>
					<p>Previous Step: Payment Information</p>
				`;
		
				prevStepBtn.classList.remove('disabled');
				nextStepBtn.textContent = 'Next Step: Payment Information';
				break;
			case 3:
				
				stepHTML = `
				<h2>Step 3: Payment Information</h2>
				<form id="payment-form">
					<label for="card-number">Card Number:</label>
					<input type="text" id="card-number" name="card-number" required>
					<label for="expiry">Expiry Date:</label>
					<input type="text" id="expiry" name="expiry" placeholder="MM/YYYY" required>
					<label for="cvv">CVV:</label>
					<input type="text" id="cvv" name="cvv" required>
					<button type="submit">Next</button>
				</form>
				<p>Next Step: Order Confirmation </p>
			`;
				prevStepBtn.classList.remove('disabled');
				nextStepBtn.textContent = 'Confirm Order';
				displayCartItems();
				break;
			case 4:
				stepHTML = `
					<h2>Order Confirmation</h2>
					<p>Your order has been confirmed!</p>
					<p>Previous Step: Review Order</p>
				`;
				prevStepBtn.classList.remove('disabled');
				nextStepBtn.classList.add('disabled');
				break;
			default:
				break;
		}
		checkoutSteps.innerHTML = stepHTML;
		updateProgressBar(stepNumber);
		handleFormSubmission(stepNumber);
	}

	// Function to display cart items in the checkout process
	function displayCartItems() {
		let cart = JSON.parse(localStorage.getItem('cart')) || [];
		let cartHTML = '';
		let total = 0;
		cart.forEach(item => {
			cartHTML += `
				<div class="cart-item">
					<p>${item.name}</p>
					<p>$${item.price.toFixed(2)}</p>
				</div>
			`;
			total += item.price;
		});
		cartItemsDiv.innerHTML = cartHTML;
		totalAmountSpan.textContent = total.toFixed(2);
	}

	// Function to handle form submissions for each checkout step
	function handleFormSubmission(stepNumber) {
		switch (stepNumber) {
			case 1:
				document.getElementById('shipping-form').addEventListener('submit', (event) => {
					event.preventDefault();
					currentStep++;
					displayCheckoutStep(currentStep);
				});
				break;
			case 2:
				document.getElementById('payment-form').addEventListener('submit', (event) => {
					event.preventDefault();
					currentStep++;
					displayCheckoutStep(currentStep);
				});
				break;
			case 3:
				document.getElementById('confirm-order-btn').addEventListener('click', () => {
					currentStep++;
					displayCheckoutStep(currentStep);
					clearCart(); // Example function to clear cart after confirmation
				});
				break;
			default:
				break;
		}
	}

	// Function to clear cart after order confirmation
	function clearCart() {
		localStorage.removeItem('cart');
		updateCartCount(); // Function to update cart count display
	}

	// Event listener for previous step button
	prevStepBtn.addEventListener('click', () => {
		if (currentStep > 1) {
			currentStep--;
			displayCheckoutStep(currentStep);
		}
	});

	// Event listener for next step button
	nextStepBtn.addEventListener('click', () => {
		if (currentStep < 4) {
			currentStep++;
			displayCheckoutStep(currentStep);
		}
	});

	// Function to update progress bar
	function updateProgressBar(stepNumber) {
		const progressPercentage = (stepNumber - 1) / 3 * 100;
		progressBar.style.width = progressPercentage + '%';

		nodes.forEach((node, index) => {
			if (index < stepNumber) {
				node.classList.add('done');
			} else {
				node.classList.remove('done');
			}
		});
	}

	// Initial update of progress bar
	updateProgressBar(currentStep);
});
