const express = require('express');
const multer = require('multer'); // For handling file uploads
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors'); // Import CORS middleware
const axios = require('axios'); // For making HTTP requests
const FormData = require('form-data'); // For handling form data

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Ensure the 'images' directory exists
const ensureDirectoryExists = async (dirPath) => {
    try {
        await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
        console.error(`Failed to create directory ${dirPath}:`, error);
    }
};

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images'); // Uploads folder where files will be stored
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });

// Error logging middleware
app.use((err, req, res, next) => {
    console.error('Error occurred:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// POST endpoint for file upload
app.post('/upload', upload.single('imageFile'), (req, res) => {
    try {
      // File should be uploaded successfully at this point
      const imageUrl = `/uploads/${req.file.filename}`; // Assuming you want to return the URL
      res.status(200).send(imageUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).send('Failed to upload file');
    }
  });
  
// Endpoint to fetch products
app.get('/api/products', async (req, res) => {
    try {
        const productsData = await fs.readFile(path.resolve(__dirname, 'data/products.json'), 'utf8');
        const products = JSON.parse(productsData);
        res.json(products);
    } catch (error) {
        console.error('Failed to fetch products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Function to upload image by calling the /upload endpoint
const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('imageFile', imageFile);

    const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

// Endpoint to add a new product with image upload
app.post('/api/products', upload.single('imageFile'), async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const imageFile = req.file;

        if (!name || !price || !description || !imageFile) {
            console.error('Missing product details or image file');
            return res.status(400).json({ error: 'Please provide all product details and image file' });
        }

        // Upload the image first
        const imageUrl = await uploadImage(imageFile);

        // Read existing products from JSON file
        const productsData = await fs.readFile(path.resolve(__dirname, 'data/products.json'), 'utf8');
        const products = JSON.parse(productsData);

        // Find the highest existing ID and increment it for the new product
        const lastId = products.reduce((maxId, product) => Math.max(product.id, maxId), 0);
        const newId = lastId + 1;

        // Create new product object
        const newProduct = {
            id: newId,
            name,
            price,
            description,
            image: imageUrl // Use the URL received from the upload response
        };

        // Add new product to the array
        products.push(newProduct);

        // Write updated products array back to JSON file
        await fs.writeFile(path.resolve(__dirname, 'data/products.json'), JSON.stringify(products, null, 2));

        // Respond with the added product
        res.json({ product: newProduct });
    } catch (error) {
        console.error('Failed to add product:', error);
        res.status(500).json({ error: 'Failed to add product' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
