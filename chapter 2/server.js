import express from 'express'; // Import the Express framework

const app = express(); // Create an Express application

app.use(express.static('public')); // Serve static files from the "public" folder
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (form submissions)
app.use(express.json()); // Parse JSON request bodies

app.post("/calculate", (req, res) => { // Define POST route at "/calculate"
    const height = parseFloat(req.body.height); // Get height from request body and convert to float
    const weight = parseFloat(req.body.weight); // Get weight from request body and convert to float
    const bmi = weight / (height * height); // Calculate BMI formula: weight ÷ (height²)

    // add another variable to tell if user is healthy, underweight or overweight
    let result; // Variable to store BMI category
    if (bmi < 18.5) { 
        result = "Underweight"; // If BMI < 18.5 → Underweight
    } else if (bmi >= 18.5 && bmi < 25) {
        result = "Healthy weight"; // If BMI is between 18.5 and 25 → Healthy
    } else {
        result = "Overweight"; // If BMI ≥ 25 → Overweight
    }

    // include result in response
    res.send(` // Send back HTML response with BMI and category
        <p>Height of ${height}m and Weight of ${weight}kg gives a BMI of ${bmi.toFixed(2)}kg/m²</p>
        <p>Category: ${result}</p>
    `);
});

app.listen(3000, () => { // Start server on port 3000
    console.log("Server is running on port: 3000"); // Log message when server starts
});
