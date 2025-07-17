const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files
app.use(express.static(__dirname));

// Route for the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'page.html'));
});

// Route for the waitlist page
app.get('/waitlist', (req, res) => {
  res.sendFile(path.join(__dirname, 'waitlist/page.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
