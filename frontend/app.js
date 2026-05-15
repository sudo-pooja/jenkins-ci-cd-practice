document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('greetBtn');
  const msg = document.getElementById('msg');

  btn.addEventListener('click', async () => {
    btn.disabled = true;
    const prev = msg.textContent;
    msg.textContent = 'Contacting backend...';
    try {
      const res = await fetch('/api/hello');
      if (!res.ok) throw new Error('Network error');
      const j = await res.json();
      msg.textContent = j.message || 'Hello!';
    } catch (e) {
      msg.textContent = 'Unable to reach backend.';
    } finally {
      setTimeout(() => { msg.textContent = prev; btn.disabled = false }, 2000);
    }
  });
});
