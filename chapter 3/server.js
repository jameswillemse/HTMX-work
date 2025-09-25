import express from 'express'; // Import the Express framework

const app = express(); // Create an Express application

app.use(express.static('public')); // Serve static files from the "public" folder
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(express.json()); // Parse JSON request bodies

let currentPrice = 60; // Starting price (e.g., stock, product, etc.)

app.get("/get-price", (req, res) => { // Define GET route at "/get-price"
    currentPrice = currentPrice + Math.random() * 2 - 1; // Randomly adjust price by -1 to +1
    res.send(`$${currentPrice.toFixed(1)}`); // Send updated price with 1 decimal place
});

app.listen(3000, () => { // Start server on port 3000
    console.log("Server is running on port: 3000"); // Log message when server starts
});
