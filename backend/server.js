const express = require('express');
const path = require('path');
const storage = require('./storage');
const app = express();

app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Notes API
app.get('/api/notes', async (req, res) => {
  const notes = await storage.readNotes();
  res.json(notes);
});

app.post('/api/notes', async (req, res) => {
  const { title, body } = req.body || {};
  if (!title) return res.status(400).json({ error: 'title required' });
  const note = { id: Date.now().toString(), title, body: body || '', createdAt: new Date().toISOString() };
  await storage.addNote(note);
  res.status(201).json(note);
});

app.delete('/api/notes/:id', async (req, res) => {
  const id = req.params.id;
  await storage.deleteNote(id);
  res.status(204).end();
});

app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));
