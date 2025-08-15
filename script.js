async function sendMessage() {
  const input = document.getElementById('message');
  const chat = document.getElementById('chat');
  const personaId = document.getElementById('persona').value;
  const userMessage = input.value.trim();
  
  if (!userMessage) return;

  // Display user message
  const userDiv = document.createElement('div');
  userDiv.className = 'user';
  userDiv.textContent = `You: ${userMessage}`;
  chat.appendChild(userDiv);

  input.value = '';

  // Send to backend
  const res = await fetch('http://localhost:5000/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMessage, personaId })
  });

  const data = await res.json();

  // Display bot reply
  const botDiv = document.createElement('div');
  botDiv.className = 'bot';
  botDiv.textContent = `${personaId === 'hitesh' ? 'Hitesh Sir' : 'Piyush Sir'}: ${data.reply}`;
  chat.appendChild(botDiv);

  chat.scrollTop = chat.scrollHeight;
}
