"use client";

import './globals.css';
import { SessionProvider, useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoSearch, IoChatboxEllipses, IoMail, IoLogoWhatsapp, IoMenu } from 'react-icons/io5';
import { translations } from '../lib/translations';
import { LanguageProvider, useLanguage } from '../lib/LanguageContext';
import { faqDatabase } from '../lib/faqData';

function MiniChat({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { language } = useLanguage();
  const t = translations[language];
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  const welcomeMessage = language === 'ar' ? 'مرحبًا! أنا شاتك الخاص، اسألني أي حاجة!' : 'Hey there! I’m your private chat, ask me anything!';

  if (messages.length === 0) {
    setMessages([{ text: welcomeMessage, sender: 'system' }]);
  }

  const cleanText = (text) => {
    return text
      .trim()
      .replace(/[؟!.,]/g, '')
      .replace(/\s+/g, ' ');
  };

  const findClosestMatch = (input, faqSection) => {
    const cleanedInput = cleanText(input);
    const keys = Object.keys(faqSection);
    let bestMatch = null;
    let highestSimilarity = 0;

    for (const key of keys) {
      const cleanedKey = cleanText(key);
      const similarity = calculateSimilarity(cleanedInput, cleanedKey);
      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
        bestMatch = key;
      }
    }

    if (highestSimilarity > 0.7) {
      return bestMatch;
    }
    return null;
  };

  const calculateSimilarity = (str1, str2) => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    const longerLength = longer.length;
    if (longerLength === 0) return 1.0;
    const editDistance = levenshteinDistance(str1, str2);
    return (longerLength - editDistance) / longerLength;
  };

  const levenshteinDistance = (a, b) => {
    const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));

    for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= b.length; j++) {
      for (let i = 1; i <= a.length; i++) {
        const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }
    return matrix[b.length][a.length];
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: 'user' }]);

    const cleanedInput = cleanText(input);

    let autoResponse = null;
    let matchedQuestion = null;

    if (language === 'ar') {
      matchedQuestion = faqDatabase.general.ar[cleanedInput] || 
                        faqDatabase.studies.ar[cleanedInput] || 
                        faqDatabase.virtualClassSkills.ar[cleanedInput];

      if (!matchedQuestion) {
        const generalMatch = findClosestMatch(cleanedInput, faqDatabase.general.ar);
        const studiesMatch = findClosestMatch(cleanedInput, faqDatabase.studies.ar);
        const virtualMatch = findClosestMatch(cleanedInput, faqDatabase.virtualClassSkills.ar);

        if (generalMatch) {
          matchedQuestion = faqDatabase.general.ar[generalMatch];
        } else if (studiesMatch) {
          matchedQuestion = faqDatabase.studies.ar[studiesMatch];
        } else if (virtualMatch) {
          matchedQuestion = faqDatabase.virtualClassSkills.ar[virtualMatch];
        }
      }

      if (!matchedQuestion) {
        if (cleanedInput.includes('عامل إيه') || cleanedInput.includes('ازيك')) {
          autoResponse = 'أنا تمام يا حبيبي! وإنتي عاملة إيه؟';
        } else if (cleanedInput.includes('تقدر تساعدني ازاي')) {
          autoResponse = 'أكيد، أقدر أساعدك! اسأليني أي سؤال عن المنصة أو الدراسة، زي "متى الامتحانات؟" أو "كيف أدخل الفصل الافتراضي؟"';
        } else {
          autoResponse = 'آسف، مش فاهم سؤالك كويس، ممكن تسألي بطريقة تانية؟ جربي مثلاً: "متى الامتحانات؟" أو "كيف أدخل الفصل الافتراضي؟"';
        }
      } else {
        autoResponse = matchedQuestion;
      }
    } else {
      matchedQuestion = faqDatabase.general.en[cleanedInput] || 
                        faqDatabase.studies.en[cleanedInput] || 
                        faqDatabase.virtualClassSkills.en[cleanedInput];

      if (!matchedQuestion) {
        const generalMatch = findClosestMatch(cleanedInput, faqDatabase.general.en);
        const studiesMatch = findClosestMatch(cleanedInput, faqDatabase.studies.en);
        const virtualMatch = findClosestMatch(cleanedInput, faqDatabase.virtualClassSkills.en);

        if (generalMatch) {
          matchedQuestion = faqDatabase.general.en[generalMatch];
        } else if (studiesMatch) {
          matchedQuestion = faqDatabase.studies.en[studiesMatch];
        } else if (virtualMatch) {
          matchedQuestion = faqDatabase.virtualClassSkills.en[virtualMatch];
        }
      }

      if (!matchedQuestion) {
        if (cleanedInput.includes('how are you')) {
          autoResponse = 'I’m doing great, thanks! How about you?';
        } else if (cleanedInput.includes('how can you help me')) {
          autoResponse = 'Sure, I can help! Ask me anything about the platform or studies, like "When are the exams?" or "How do I join a virtual class?"';
        } else {
          autoResponse = 'Sorry, I didn’t quite get that. Can you ask differently? Try something like "When are the exams?" or "How do I join a virtual class?"';
        }
      } else {
        autoResponse = matchedQuestion;
      }
    }

    if (autoResponse) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: autoResponse, sender: 'system' },
      ]);
    }
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '80px', 
      right: '20px', 
      width: '320px', 
      height: '450px', 
      background: 'linear-gradient(135deg, #FFF5E1 0%, #F5E5C1 100%)', 
      border: '2px solid #D2B48C', 
      borderRadius: '15px', 
      zIndex: 1000, 
      display: 'flex', 
      flexDirection: 'column', 
      boxShadow: '0 8px 16px rgba(0,0,0,0.3)', 
      overflow: 'hidden',
      fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif",
    }}>
      <div style={{ 
        padding: '12px 15px', 
        background: 'linear-gradient(to right, #D2B48C, #C19A6B)', 
        color: '#FFF5E1', 
        borderTopLeftRadius: '13px', 
        borderTopRightRadius: '13px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}>
        <h3 style={{ 
          margin: 0, 
          fontSize: '18px', 
          fontWeight: 'bold',
          textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
        }}>
          {language === 'ar' ? 'شاتك الخاص' : 'Your Private Chat'}
        </h3>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={onClose} style={{ 
            background: 'none', 
            border: 'none', 
            color: '#FFF5E1', 
            cursor: 'pointer', 
            fontSize: '18px',
            transition: 'transform 0.2s',
          }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <span>-</span>
          </button>
          <Link href="/chat" style={{ color: '#FFF5E1', textDecoration: 'none' }}>
            <span style={{ 
              fontSize: '18px',
              transition: 'transform 0.2s',
            }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              ...
            </span>
          </Link>
          <button onClick={onClose} style={{ 
            background: 'none', 
            border: 'none', 
            color: '#FFF5E1', 
            cursor: 'pointer', 
            fontSize: '18px',
            transition: 'transform 0.2s',
          }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <span>X</span>
          </button>
        </div>
      </div>
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: '15px', 
        direction,
        background: '#FFF5E1',
        borderBottom: '1px solid #D2B48C',
      }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ 
            display: 'flex', 
            justifyContent: msg.sender === 'user' ? (language === 'ar' ? 'flex-end' : 'flex-start') : (language === 'ar' ? 'flex-start' : 'flex-end'), 
            margin: '8px 0',
          }}>
            <div style={{ 
              maxWidth: '75%', 
              padding: '10px', 
              borderRadius: '12px', 
              background: msg.sender === 'user' ? '#D2B48C' : '#F5E5C1', 
              color: msg.sender === 'user' ? '#FFF5E1' : '#4A3728',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'background 0.3s',
            }}>
              <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.4' }}>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '12px', background: '#FFF5E1' }}>
        <input 
          type='text' 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyPress={handleKeyPress} 
          placeholder={t.typeQuestion} 
          style={{ 
            width: '100%', 
            padding: '10px', 
            borderRadius: '8px', 
            border: '1px solid #D2B48C', 
            fontSize: '15px', 
            outline: 'none', 
            background: '#F5F5DC',
            transition: 'border-color 0.3s',
          }} 
          onFocus={(e) => e.target.style.borderColor = '#C19A6B'}
          onBlur={(e) => e.target.style.borderColor = '#D2B48C'}
        />
      </div>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <LanguageProvider>
      <SessionProvider>
        <InnerLayout>{children}</InnerLayout>
      </SessionProvider>
    </LanguageProvider>
  );
}

function InnerLayout({ children }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${searchQuery}`);
      setShowSearch(false);
    }
  };

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    document.documentElement.lang = newLang;
  };

  const handleChatClose = () => {
    setShowChat(false);
  };

  return (
    <html lang={language} dir={direction}>
      <head>
        <title>{t.platformName}</title>
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@800&family=Roboto:wght@800&family=Cairo:wght@900&family=Amiri:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", backgroundColor: '#F5F5DC', minHeight: '100vh', display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <header style={{ backgroundColor: '#D2B48C', padding: '5px 10px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#4A3728', position: 'sticky', top: 0, zIndex: 1000, fontWeight: '800' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', order: language === 'ar' ? 1 : 0 }}>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowMenu(true)} style={{ 
                background: 'none', 
                border: 'none', 
                color: '#FFF5E1', 
                cursor: 'pointer', 
                fontSize: '24px',
                padding: '5px',
                borderRadius: '4px',
                transition: 'background-color 0.3s, transform 0.3s',
              }} 
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#C19A6B';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
              }}>
                <IoMenu />
              </button>
              {showMenu && (
                <div
                  onMouseLeave={() => setShowMenu(false)}
                  style={{
                    position: 'absolute', 
                    top: '100%', 
                    left: 0, 
                    backgroundColor: '#FFF5E1', 
                    border: '1px solid #D2B48C', 
                    borderRadius: '5px', 
                    padding: '15px',
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '10px', 
                    zIndex: 1000, 
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)', 
                    minWidth: '150px',
                  }}
                >
                  <Link href="/" style={{ textDecoration: 'none', color: '#1A120B' }}>
                    <button style={{ backgroundColor: '#FFF5E1', border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold', fontFamily: "'Amiri', serif", padding: '10px 15px', width: '100%', textAlign: 'start', borderBottom: '1px solid #D2B48C', transition: 'background-color 0.3s, color 0.3s, border-bottom 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5E5C1'; e.currentTarget.style.color = '#D2B48C'; e.currentTarget.style.borderBottom = '2px solid #8B5A2B'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFF5E1'; e.currentTarget.style.color = '#1A120B'; e.currentTarget.style.borderBottom = '1px solid #D2B48C'; }}>{t.home}</button>
                  </Link>
                  <Link href="/materials" style={{ textDecoration: 'none', color: '#1A120B' }}>
                    <button style={{ backgroundColor: '#FFF5E1', border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold', fontFamily: "'Amiri', serif", padding: '10px 15px', width: '100%', textAlign: 'start', borderBottom: '1px solid #D2B48C', transition: 'background-color 0.3s, color 0.3s, border-bottom 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5E5C1'; e.currentTarget.style.color = '#D2B48C'; e.currentTarget.style.borderBottom = '2px solid #8B5A2B'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFF5E1'; e.currentTarget.style.color = '#1A120B'; e.currentTarget.style.borderBottom = '1px solid #D2B48C'; }}>{t.materials}</button>
                  </Link>
                  <Link href="/quizzes" style={{ textDecoration: 'none', color: '#1A120B' }}>
                    <button style={{ backgroundColor: '#FFF5E1', border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold', fontFamily: "'Amiri', serif", padding: '10px 15px', width: '100%', textAlign: 'start', borderBottom: '1px solid #D2B48C', transition: 'background-color 0.3s, color 0.3s, border-bottom 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5E5C1'; e.currentTarget.style.color = '#D2B48C'; e.currentTarget.style.borderBottom = '2px solid #8B5A2B'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFF5E1'; e.currentTarget.style.color = '#1A120B'; e.currentTarget.style.borderBottom = '1px solid #D2B48C'; }}>{t.quizzes}</button>
                  </Link>
                  <Link href="/discussions" style={{ textDecoration: 'none', color: '#1A120B' }}>
                    <button style={{ backgroundColor: '#FFF5E1', border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold', fontFamily: "'Amiri', serif", padding: '10px 15px', width: '100%', textAlign: 'start', borderBottom: '1px solid #D2B48C', transition: 'background-color 0.3s, color 0.3s, border-bottom 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5E5C1'; e.currentTarget.style.color = '#D2B48C'; e.currentTarget.style.borderBottom = '2px solid #8B5A2B'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFF5E1'; e.currentTarget.style.color = '#1A120B'; e.currentTarget.style.borderBottom = '1px solid #D2B48C'; }}>{t.discussions}</button>
                  </Link>
                  <Link href="/projects" style={{ textDecoration: 'none', color: '#1A120B' }}>
                    <button style={{ backgroundColor: '#FFF5E1', border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold', fontFamily: "'Amiri', serif", padding: '10px 15px', width: '100%', textAlign: 'start', borderBottom: '1px solid #D2B48C', transition: 'background-color 0.3s, color 0.3s, border-bottom 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5E5C1'; e.currentTarget.style.color = '#D2B48C'; e.currentTarget.style.borderBottom = '2px solid #8B5A2B'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFF5E1'; e.currentTarget.style.color = '#1A120B'; e.currentTarget.style.borderBottom = '1px solid #D2B48C'; }}>Projects</button>
                  </Link>
                  <Link href="/classroom" style={{ textDecoration: 'none', color: '#1A120B' }}>
                    <button style={{ backgroundColor: '#FFF5E1', border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold', fontFamily: "'Amiri', serif", padding: '10px 15px', width: '100%', textAlign: 'start', borderBottom: '1px solid #D2B48C', transition: 'background-color 0.3s, color 0.3s, border-bottom 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5E5C1'; e.currentTarget.style.color = '#D2B48C'; e.currentTarget.style.borderBottom = '2px solid #8B5A2B'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFF5E1'; e.currentTarget.style.color = '#1A120B'; e.currentTarget.style.borderBottom = '1px solid #D2B48C'; }}>{t.classroomTitle}</button>
                  </Link>
                  <Link href="/results" style={{ textDecoration: 'none', color: '#1A120B' }}>
                    <button style={{ backgroundColor: '#FFF5E1', border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold', fontFamily: "'Amiri', serif", padding: '10px 15px', width: '100%', textAlign: 'start', borderBottom: '1px solid #D2B48C', transition: 'background-color 0.3s, color 0.3s, border-bottom 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5E5C1'; e.currentTarget.style.color = '#D2B48C'; e.currentTarget.style.borderBottom = '2px solid #8B5A2B'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFF5E1'; e.currentTarget.style.color = '#1A120B'; e.currentTarget.style.borderBottom = '1px solid #D2B48C'; }}>{t.results}</button>
                  </Link>
                  {session ? (
                    <button onClick={() => signOut({ callbackUrl: '/' })} style={{ backgroundColor: '#FFF5E1', border: 'none', color: '#D2B48C', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold', fontFamily: "'Amiri', serif", padding: '10px 15px', width: '100%', textAlign: 'start', transition: 'background-color 0.3s, color 0.3s, border-bottom 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5E5C1'; e.currentTarget.style.color = '#8B5A2B'; e.currentTarget.style.borderBottom = '2px solid #8B5A2B'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFF5E1'; e.currentTarget.style.color = '#D2B48C'; e.currentTarget.style.borderBottom = 'none'; }}>{t.signOut}</button>
                  ) : (
                    <Link href="/login" style={{ textDecoration: 'none', color: '#D2B48C' }}>
                      <button style={{ backgroundColor: '#FFF5E1', border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold', fontFamily: "'Amiri', serif", padding: '10px 15px', width: '100%', textAlign: 'start', transition: 'background-color 0.3s, color 0.3s, border-bottom 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5E5C1'; e.currentTarget.style.color = '#8B5A2B'; e.currentTarget.style.borderBottom = '2px solid #8B5A2B'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFF5E1'; e.currentTarget.style.color = '#D2B48C'; e.currentTarget.style.borderBottom = 'none'; }}>{t.signIn}</button>
                    </Link>
                  )}
                </div>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowSearch(!showSearch)} style={{ backgroundColor: '#C19A6B', padding: '8px', borderRadius: '8px', border: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', cursor: 'pointer' }}><IoSearch size={20} color="#FFF5E1" /></button>
              {showSearch && (
                <form onSubmit={handleSearch} style={{ position: 'absolute', top: '40px', left: 0, zIndex: 1000 }}>
                  <input type="text" placeholder={t.searchPlaceholder} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ padding: '5px', borderRadius: '5px', border: 'none', width: '200px' }} autoFocus />
                </form>
              )}
            </div>
            {session && (
              <Link href="/profile">
                <Image src={session.user.image} alt="User" width={40} height={40} />
              </Link>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', order: language === 'ar' ? 0 : 1 }}>
            <Link href="/">
              <Image src="/logo.png" alt="Logo" width={90} height={90} style={{ borderRadius: '50%' }} />
            </Link>
            <span style={{ color: '#8B5A2B', fontSize: '22px', fontWeight: '900', fontFamily: "'Cairo', sans-serif", textShadow: '1px 1px 2px rgba(0,0,0,0.2)', textDecoration: 'none', cursor: 'default' }}>سكيب</span>
          </div>
        </header>
        <button 
          onClick={() => setShowChat(!showChat)} 
          style={{ 
            position: 'fixed', 
            bottom: '80px', 
            right: '20px', 
            zIndex: 1000, 
            background: 'linear-gradient(to right, #D2B48C, #C19A6B)', 
            borderRadius: '50%', 
            padding: '12px', 
            border: 'none', 
            cursor: 'pointer', 
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)', 
            transition: 'transform 0.3s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <IoChatboxEllipses size={40} color="#FFF5E1" />
        </button>
        {showChat && <MiniChat onClose={handleChatClose} />}
        <main style={{ flex: 1, overflow: 'auto', padding: '10px', maxHeight: 'calc(100vh - 150px)' }}>{children}</main>
        <footer style={{ backgroundColor: '#D2B48C', padding: '5px', height: '80px', color: '#3A2B1F', fontWeight: 'bold' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', gap: '15px', height: '100%' }}>
            <div style={{ display: 'flex', gap: '10px', order: 1 }}>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=nourhanmatwally@gmail.com&su=استفسار%20عن%20المنصة&body=مرحبًا،%20أود%20الاستفسار%20عن..." target="_blank" rel="noopener noreferrer"><IoMail size={20} color="#3A2B1F" /></a>
              <a href="https://wa.me/01284423601" target="_blank" rel="noopener noreferrer"><IoLogoWhatsapp size={20} color="#3A2B1F" /></a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, order: '2' }}>
              <p style={{ margin: 0 }}>© 2025 {language === 'ar' ? "منصة سكيب للتعلم" : "Skip Learning Platform"}</p>
              <Link href="/user-guide" style={{ color: '#3A2B1F', textDecoration: 'none', marginTop: '5px' }}>{t.userGuide}</Link>
            </div>
            <div style={{ display: 'flex', gap: '10px', order: 3, direction }}>
              <button onClick={toggleLanguage} style={{ backgroundColor: '#FFF5E1', color: '#3A2B1F', padding: '5px 10px', borderRadius: '5px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>{language === 'ar' ? "English" : "عربي"}</button>
              <Link href="/faq" style={{ color: '#3A2B1F', textDecoration: 'none' }}>{language === 'ar' ? "الأسئلة الشائعة" : "FAQ"}</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}