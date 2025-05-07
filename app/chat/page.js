'use client';

import { useState } from 'react';
import { translations } from '../../lib/translations';
import { useLanguage } from '../../lib/LanguageContext';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { language } = useLanguage();
  const t = translations[language];
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, sender: 'user' }]);

    let botResponse = language === 'ar' ? 'آسف، لم أفهم سؤالك. يمكنك إعادة صياغته؟' : 'Sorry, I didn’t understand your question. Can you rephrase it?';

    if (language === 'ar') {
      if (input.includes('مرحبًا') || input.includes('مرحبا') || input.includes('هلا') || input.includes('ازيك')) {
        botResponse = 'مرحبًا! ازيك؟ كيف يمكنني مساعدتك اليوم؟';
      } else if (input.includes('كيف أبدأ') || input.includes('ازاي ابدأ') || input.includes('اعمل ايه')) {
        botResponse = 'ممكن تبدأ بالذهاب لصفحة المواد الدراسية واختيار المادة اللي عايز تدرّسها!';
      } else if (input.includes('ما هي المنصة') || input.includes('ايه المنصة دي')) {
        botResponse = 'أنا منصة تعليمية بتساعد الطلاب يتعلموا بسهولة ومرونة في أي وقت ومن أي مكان!';
      }
    } else {
      if (input.toLowerCase().includes('hello') || input.toLowerCase().includes('hi') || input.toLowerCase().includes('hey')) {
        botResponse = 'Hey there! How can I assist you today?';
      } else if (input.toLowerCase().includes('how to start') || input.toLowerCase().includes('how do i begin')) {
        botResponse = 'You can start by going to the Materials page and choosing a subject to study!';
      } else if (input.toLowerCase().includes('what is this platform') || input.toLowerCase().includes('what’s this')) {
        botResponse = 'I’m an educational platform that helps students learn easily and flexibly anytime, anywhere!';
      }
    }

    setMessages((prev) => [...prev, { text: botResponse, sender: 'bot' }]);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="container" style={{ direction, minHeight: 'calc(100vh - 120px)' }}>
      <h1 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', textAlign: 'center' }}>
        {t.learningAssistant}
      </h1>
      <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #D2B48C', borderRadius: '8px', padding: '10px', backgroundColor: '#FFF5E1' }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: msg.sender === 'user' ? (language === 'ar' ? 'flex-end' : 'flex-start') : (language === 'ar' ? 'flex-start' : 'flex-end'),
              margin: '10px 0',
            }}
          >
            <div
              style={{
                maxWidth: '70%',
                padding: '10px',
                borderRadius: '8px',
                backgroundColor: msg.sender === 'user' ? '#D2B48C' : '#F5F5DC',
                color: msg.sender === 'user' ? '#FFF5E1' : '#333',
              }}
            >
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t.typeQuestion}
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #D2B48C' }}
        />
        <button onClick={handleSend} style={{ backgroundColor: '#D2B48C', color: '#FFF5E1', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold' }}>
          {t.send}
        </button>
      </div>
    </div>
  );
}