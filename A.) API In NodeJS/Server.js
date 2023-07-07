const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// User login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validate username
  const usernameRegex = /^[a-zA-Z0-9]{6,12}$/;
  if (!username.match(usernameRegex)) {
    return res.status(400).json({ error: 'Invalid username' });
  }

  // Validate password
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password should be at least 6 characters long' });
  }

  // You can perform further checks or authenticate the user here
  // For simplicity, we'll just send a success message
  res.json({ message: 'Login successful' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
