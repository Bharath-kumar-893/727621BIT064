const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// Serve the static HTML file
app.use(express.static(path.join(__dirname, 'public')));

const calculateAverage = (numbers) => {
  if (!numbers || numbers.length === 0) {
    return 0;
  }
  const sum = numbers.reduce((acc, current) => acc + current, 0);
  return sum / numbers.length;
};

app.post('/average', (req, res) => {
  const numbers = req.body.numbers;
  if (!numbers || !Array.isArray(numbers)) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  const average = calculateAverage(numbers);
  res.json({ average });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Average calculator microservice listening on port ${port}`);
});
