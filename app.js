const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs'); // Set up EJS as the templating engine
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

app.get('/', (req, res) => {
  res.render('index'); // Render the index.ejs file
});

app.listen(3000, () => {
  console.log('Client server running at http://localhost:3000');
});
