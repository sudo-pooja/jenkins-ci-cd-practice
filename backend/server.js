const express = require('express');
const path = require('path');
const app = express();

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));
