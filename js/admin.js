// document.addEventListener('DOMContentLoaded', () => {
//   const navLinks = document.querySelectorAll('.nav-link');
//   const sections = document.querySelectorAll('.section');
//   const addProductForm = document.getElementById('add-product-form');
//   const productList = document.getElementById('product-list');

//   // Event listeners for navigation links
//   navLinks.forEach(link => {
//       link.addEventListener('click', (event) => {
//           event.preventDefault();
//           const sectionId = link.getAttribute('data-section');
//           showSection(sectionId);
//       });
//   });

//   // Event listener for add product form submission
//   addProductForm.addEventListener('submit', async (event) => {
//       event.preventDefault();

//       const name = document.getElementById('product-name').value;
//       const price = parseFloat(document.getElementById('product-price').value);
//       const description = document.getElementById('product-description').value;
//       const imageFile = document.getElementById('product-image').files[0];

//       // Check if all fields are filled
//       if (!name || !price || !description || !imageFile) {
//           alert('Please fill in all fields.');
//           return;
//       }
//       const product = { name, price, description, imageFile };

//       // Prepare FormData to send file data
//       const formData = new FormData();
//       formData.append('name', product.name);
//       formData.append('price', product.price);
//       formData.append('description', product.description);
//       formData.append('imageFile', product.imageFile, product.imageFile.name);



//       try {
//           // Upload image and get image URL from server
//             const imageUrl = await uploadProductImage(product);

//             const newProduct = {
//                 name: product.name,
//                 price: product.price,
//                 description: product.description,
//                 image: imageUrl // Use the URL received from the server
//             };

//                // Add product to server and update UI
//                const addedProduct = await addProduct(newProduct);
//                alert('Product added successfully!');
//                addProductForm.reset();
//                showSection('manage-products'); // Show the manage products section after adding
//                renderProductList(); // Render the updated product list
//            } catch (error) {
//                console.error('Error adding product:', error);
//                alert('Failed to add product.');
//            }
//        });
   

//   // Function to show/hide sections based on navigation click
//   function showSection(sectionId) {
//       sections.forEach(section => {
//           section.classList.remove('active');
//           if (section.id === sectionId) {
//               section.classList.add('active');
//           }
//       });
//   }

//   // Function to render product list
//   async function renderProductList() {
//       try {
//           const products = await fetchProducts();
//           productList.innerHTML = '';
//           products.forEach(product => {
//               const productDiv = document.createElement('div');
//               productDiv.classList.add('product');
//               productDiv.innerHTML = `
//                   <img src="${product.image}" alt="${product.name}">
//                   <h3>${product.name}</h3>
//                   <p>${product.description}</p>
//                   <p class="price">$${product.price.toFixed(2)}</p>
//               `;
//               productList.appendChild(productDiv);
//           });
//       } catch (error) {
//           console.error('Failed to fetch products:', error);
//       }
//   }

//   // Function to fetch products from server
//   async function fetchProducts() {
//       try {
//           const response = await fetch('http://localhost:3000/api/products');
//           if (!response.ok) {
//               throw new Error('Failed to fetch products');
//           }
//           const data = await response.json();
//           return data;
//       } catch (error) {
//           throw new Error(`Failed to fetch products: ${error.message}`);
//       }
//   }

//   const addProduct = async (product) => {
//     try {
//       const formData = new FormData();
//       formData.append('name', product.name);
//       formData.append('price', product.price);
//       formData.append('description', product.description);
//       formData.append('imageFile', product.imageFile, product.imageFile.name);


//         const response = await fetch('http://localhost:3000/api/products', {
//             method: 'POST',
//             body: formData,
//         });

//         if (!response.ok) {
//             throw new Error('Failed to add product');
//         }

//         const result = await response.json();
//         console.log('Product added:', result);
//     } catch (error) {
//         console.error('Error adding product:', error);
//     }
// };


//   // Function to upload product image to server

//     async function uploadProductImage(product) {
//       try {
//         const formData = new FormData();
//         formData.append('imageFile', product.imageFile);
    
//         const response = await fetch('http://localhost:3000/upload', {
//           method: 'POST',
//           body: formData
//         });
    
//         if (!response.ok) {
//           throw new Error('Failed to upload product image');
//         }
    
//         const imageUrl = await response.text();
//         return imageUrl;
//       } catch (error) {
//         console.error('Error uploading product image:', error);
//         throw error;
//       }
//     }
    

//   // Initial load - fetch products when DOM content is loaded
//   renderProductList();
// });


document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  const addProductForm = document.getElementById('add-product-form');
  const productList = document.getElementById('product-list');

  // Event listeners for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const sectionId = link.getAttribute('data-section');
      showSection(sectionId);
    });
  });

  // Event listener for add product form submission
  addProductForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const description = document.getElementById('product-description').value;
    const imageFile = document.getElementById('product-image').files[0];

    // Check if all fields are filled
    if (!name || !price || !description || !imageFile) {
      alert('Please fill in all fields.');
      return;
    }

    const product = { name, price, description, imageFile };

    try {
      // Upload image and get image URL from server
      const imageUrl = await uploadProductImage(product);

      const newProduct = {
        name: product.name,
        price: product.price,
        description: product.description,
        image: imageUrl // Use the URL received from the server
      };

      // Add product to server and update UI
      const addedProduct = await addProduct(newProduct);
      alert('Product added successfully!');
      addProductForm.reset();
      showSection('manage-products'); // Show the manage products section after adding
      renderProductList(); // Render the updated product list
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    }
  });

  // Function to show/hide sections based on navigation click
  function showSection(sectionId) {
    sections.forEach(section => {
      section.classList.remove('active');
      if (section.id === sectionId) {
        section.classList.add('active');
      }
    });
  }

  // Function to render product list
  async function renderProductList() {
    try {
      const products = await fetchProducts();
      productList.innerHTML = '';
      products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p class="price">$${product.price.toFixed(2)}</p>
        `;
        productList.appendChild(productDiv);
      });
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  }

  // Function to fetch products from server
  async function fetchProducts() {
    try {
      const response = await fetch('http://localhost:3000/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  }

  // Function to add product to server
  const addProduct = async (product) => {
    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('price', product.price);
      formData.append('description', product.description);
      formData.append('imageFile', product.imageFile, product.imageFile.name);

      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const result = await response.json();
      console.log('Product added:', result);
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  // Function to upload product image to server
  async function uploadProductImage(product) {
    try {
      const formData = new FormData();
      formData.append('imageFile', product.imageFile);

      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload product image');
      }

      const imageUrl = await response.text();
      return imageUrl;
    } catch (error) {
      console.error('Error uploading product image:', error);
      throw error;
    }
  }

  // Initial load - fetch products when DOM content is loaded
  renderProductList();
});
