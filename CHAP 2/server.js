import express from 'express';

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.post("/calculate", (req, res) => {
  const height = parseFloat(req.body.height);
  const weight = parseFloat(req.body.weight);
  const bmi = weight / (height * height);
  res.send(`
    <p>Height of ${height}m and Weight of ${weight}kg gives a BMI of ${bmi.toFixed(2)}kg/m2</p>
  `);
});
let category = "";

if (bmi < 18.5) {
category = "Underweight";
} else if (bmi >- 18.5 && bmi < 24.9) {
category = "Normal weight";
} else if (bmi >= 25 && bmi < 29.9) {
category = "Overweight";
} else {
category = "Obese";
}
app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});
