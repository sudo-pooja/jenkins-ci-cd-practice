document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('noteForm');
  const title = document.getElementById('title');
  const body = document.getElementById('body');
  const addBtn = document.getElementById('addBtn');
  const list = document.getElementById('notesList');

  async function loadNotes() {
    try {
      const res = await fetch('/api/notes');
      const notes = await res.json();
      renderNotes(notes);
    } catch (e) {
      list.innerHTML = '<li class="muted">Failed to load notes.</li>';
    }
  }

  function renderNotes(notes) {
    if (!notes || !notes.length) {
      list.innerHTML = '<li class="muted">No notes yet.</li>';
      return;
    }
    list.innerHTML = '';
    for (const n of notes) {
      const li = document.createElement('li');
      li.className = 'note-item';
      li.innerHTML = `<div class="note-head"><strong>${escapeHtml(n.title)}</strong><button data-id="${n.id}" class="del">Delete</button></div><div class="note-body">${escapeHtml(n.body)}</div><div class="muted">${new Date(n.createdAt).toLocaleString()}</div>`;
      list.appendChild(li);
    }
  }

  function escapeHtml(s) { return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  list.addEventListener('click', async (e) => {
    const btn = e.target.closest('button.del');
    if (!btn) return;
    const id = btn.getAttribute('data-id');
    const li = btn.closest('li');
    if (li) {
      li.classList.add('removing');
      // wait for animation to finish, then call delete and remove from DOM
      await new Promise(resolve => li.addEventListener('animationend', resolve, { once: true }));
    }
    try {
      await fetch('/api/notes/' + id, { method: 'DELETE' });
      if (li && li.parentNode) li.parentNode.removeChild(li);
      // if list becomes empty, reload to show placeholder
      if (!list.querySelector('li')) loadNotes();
    } catch (e) { loadNotes(); }
  });

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    addBtn.disabled = true;
    try {
      const payload = { title: title.value.trim(), body: body.value.trim() };
      const res = await fetch('/api/notes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (res.ok) {
        title.value = '';
        body.value = '';
        loadNotes();
      }
    } catch (e) { /* ignore */ } finally { addBtn.disabled = false }
  });

  loadNotes();
});

