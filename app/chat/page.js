'use client';

import { useState, useEffect, useRef } from 'react';
import { translations } from '../../lib/translations';
import { useLanguage } from '../../lib/LanguageContext';
import styled, { keyframes } from 'styled-components';
import { faqDatabase } from '../../lib/faqData';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 120px);
  padding: 20px;
  direction: ${(props) => (props.isarabic === 'true' ? 'rtl' : 'ltr')};
  background: linear-gradient(135deg, #F9F5EB, #EDE4D3);
`;

const ChatBubble = styled.div`
  width: 500px;
  max-width: 90%;
  height: 400px;
  overflow-y: auto;
  border: 2px solid #4A704A;
  border-radius: 20px;
  padding: 15px;
  background: #FFF8E7;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Message = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: ${(props) => (props.sender === 'user' ? (props.isarabic === 'true' ? 'flex-end' : 'flex-start') : (props.isarabic === 'true' ? 'flex-start' : 'flex-end'))};
  animation: ${fadeIn} 0.3s ease-in-out;

  & > div {
    max-width: 70%;
    padding: 10px 15px;
    border-radius: 15px;
    background-color: ${(props) => (props.sender === 'user' ? '#6B8A6B' : '#EDE4D3')};
    color: ${(props) => (props.sender === 'user' ? '#FFF' : '#333')};
    position: relative;
    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border: 10px solid transparent;
      ${(props) => (props.sender === 'user' ? (props.isarabic === 'true' ? 'right: -10px;' : 'left: -10px;') : (props.isarabic === 'true' ? 'left: -10px;' : 'right: -10px;'))}
      border-${(props) => (props.sender === 'user' ? (props.isarabic === 'true' ? 'right' : 'left') : (props.isarabic === 'true' ? 'left' : 'right'))}-color: ${(props) => (props.sender === 'user' ? '#6B8A6B' : '#EDE4D3')};
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;

const BotAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #4A704A;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 500px;
  max-width: 90%;
`;

const OvalInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #4A704A;
  border-radius: 25px;
  font-size: 1em;
  outline: none;
  background-color: #F9F5EB;
  &:focus {
    border-color: #6B8A6B;
    box-shadow: 0 0 5px rgba(107, 138, 107, 0.5);
  }
`;

const SendButton = styled.button`
  padding: 10px 20px;
  background-color: #4A704A;
  color: #FFF;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #3A5A3A;
  }
`;

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { language } = useLanguage();
  const t = translations[language];
  const isArabic = language === 'ar';
  const chatRef = useRef(null);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, sender: 'user' }]);

    let botResponse = isArabic ? 'آسف، لم أفهم سؤالك. يمكنك إعادة صياغته؟' : 'Sorry, I didn’t understand your question. Can you rephrase it?';

    const allFaqs = [
      ...Object.entries(faqDatabase?.general?.[isArabic ? 'ar' : 'en'] || {}).map(([q, a]) => ({ question: q, answer: a })),
      ...Object.entries(faqDatabase?.studies?.[isArabic ? 'ar' : 'en'] || {}).map(([q, a]) => ({ question: q, answer: a })),
      ...Object.entries(faqDatabase?.virtualClassSkills?.[isArabic ? 'ar' : 'en'] || {}).map(([q, a]) => ({ question: q, answer: a })),
      ...Object.entries(faqDatabase?.projectsDiscussions?.[isArabic ? 'ar' : 'en'] || {}).map(([q, a]) => ({ question: q, answer: a })),
      ...Object.entries(faqDatabase?.googleClassroom?.[isArabic ? 'ar' : 'en'] || {}).map(([q, a]) => ({ question: q, answer: a })),
    ];

    for (const faq of allFaqs) {
      if (input.toLowerCase().includes(faq.question.toLowerCase())) {
        botResponse = faq.answer;
        break;
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
    <Container isarabic={isArabic.toString()}>
      <h1 style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', textAlign: 'center', color: '#4A704A' }}>
        {t.learningAssistant}
      </h1>
      <ChatBubble ref={chatRef}>
        {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender} isarabic={isArabic.toString()}>
            {msg.sender === 'bot' && (
              <BotAvatar src="/bot-avatar.png" alt="Bot Avatar" />
            )}
            <div>
              <p>{msg.text}</p>
            </div>
          </Message>
        ))}
      </ChatBubble>
      <InputContainer>
        <OvalInput
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t.typeQuestion}
        />
        <SendButton onClick={handleSend}>{t.send || 'إرسال'}</SendButton>
      </InputContainer>
    </Container>
  );
}