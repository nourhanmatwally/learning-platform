'use client';

import { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);

    // محاكاة استجابة الشات بوت (يمكن نربطه بـ Grok لاحقًا)
    const botResponse = { text: `رد على: ${input}`, sender: 'bot' };
    setTimeout(() => setMessages((prev) => [...prev, botResponse]), 1000);

    setInput('');
  };

  return (
    <div className="container">
      <h1 className="header">الشات بوت التعليمي</h1>
      <div className="card" style={{ height: '400px', overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            {msg.text}
          </div>
        ))}
      </div>
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="اكتب سؤالك..."
          style={{ width: '70%', padding: '10px' }}
        />
        <button onClick={handleSend}>إرسال</button>
      </div>
    </div>
  );
}