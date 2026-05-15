const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const NOTES_FILE = path.join(DATA_DIR, 'notes.json');

async function ensureData() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(NOTES_FILE);
  } catch (e) {
    await fs.writeFile(NOTES_FILE, '[]', 'utf8');
  }
}

async function readNotes() {
  await ensureData();
  const raw = await fs.readFile(NOTES_FILE, 'utf8');
  try { return JSON.parse(raw); } catch (e) { return []; }
}

async function writeNotes(notes) {
  await ensureData();
  await fs.writeFile(NOTES_FILE, JSON.stringify(notes, null, 2), 'utf8');
}

async function addNote(note) {
  const notes = await readNotes();
  notes.unshift(note);
  await writeNotes(notes);
  return note;
}

async function deleteNote(id) {
  const notes = await readNotes();
  const filtered = notes.filter(n => n.id !== id);
  await writeNotes(filtered);
  return filtered;
}

module.exports = { readNotes, addNote, deleteNote };
