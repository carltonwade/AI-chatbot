const messagesEl = document.getElementById('messages');
const formEl = document.getElementById('chat-form');
const inputEl = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const clearBtn = document.getElementById('clear-btn');

let history = JSON.parse(sessionStorage.getItem('chatHistory') || '[]');

renderAll();

function renderAll() {
  messagesEl.innerHTML = '';
  history.forEach((m) => appendMessage(m.role, m.content, false));
  scrollToBottom();
}

function appendMessage(role, content, save = true) {
  const div = document.createElement('div');
  div.className = `msg ${role === 'user' ? 'user' : 'bot'}`;
  div.textContent = content;
  messagesEl.appendChild(div);
  if (save) {
    history.push({ role, content });
    sessionStorage.setItem('chatHistory', JSON.stringify(history));
  }
  scrollToBottom();
  return div;
}

function scrollToBottom() {
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = inputEl.value.trim();
  if (!text) return;

  appendMessage('user', text);
  inputEl.value = '';
  inputEl.style.height = 'auto';
  sendBtn.disabled = true;

  const typingEl = document.createElement('div');
  typingEl.className = 'msg bot typing';
  typingEl.textContent = 'Thinking...';
  messagesEl.appendChild(typingEl);
  scrollToBottom();

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history }),
    });

    const data = await res.json();
    typingEl.remove();

    if (!res.ok) throw new Error(data.error || 'Request failed');

    appendMessage('assistant', data.reply);
  } catch (err) {
    typingEl.remove();
    appendMessage('assistant', `⚠️ ${err.message}`);
  } finally {
    sendBtn.disabled = false;
    inputEl.focus();
  }
});

inputEl.addEventListener('input', () => {
  inputEl.style.height = 'auto';
  inputEl.style.height = Math.min(inputEl.scrollHeight, 140) + 'px';
});

inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    formEl.requestSubmit();
  }
});

clearBtn.addEventListener('click', () => {
  history = [];
  sessionStorage.removeItem('chatHistory');
  messagesEl.innerHTML = '';
});
