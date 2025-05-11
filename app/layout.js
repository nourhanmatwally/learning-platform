'use client';

import './globals.css';
import { SessionProvider, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { IoSearch, IoChatboxEllipses, IoMail, IoLogoWhatsapp } from 'react-icons/io5';
import { translations } from '../lib/translations';
import { LanguageProvider, useLanguage } from '../lib/LanguageContext';
import { faqDatabase } from '../lib/faqData';

function MiniChat({ onClose, isAutoOpened }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isClosedPermanently, setIsClosedPermanently] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  const welcomeMessage = language === 'ar' ? 'مرحبًا! عايز مساعدة؟' : 'Hi! Need help?';

  useEffect(() => {
    if (!messages.length) {
      setMessages([{ text: welcomeMessage, sender: 'system' }]);
    }
  }, [messages.length, welcomeMessage]);

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

  const handlePermanentClose = () => {
    setIsClosedPermanently(true);
    onClose();
  };

  if (isClosedPermanently && !isAutoOpened) return null;

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '80px', 
      right: '20px', 
      width: '320px', 
      height: '450px', 
      background: '#FFF5E1', 
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
        background: 'linear-gradient(to right, #F5EAD0, #EDE0B0)', 
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
            transition: 'all 0.3s',
            minWidth: '40px',
            minHeight: '40px',
          }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <span>-</span>
          </button>
          <Link href="/chat" style={{ color: '#FFF5E1', textDecoration: 'none', minWidth: '40px', minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ 
              fontSize: '18px',
              transition: 'all 0.3s',
            }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              ...
            </span>
          </Link>
          <button onClick={handlePermanentClose} style={{ 
            background: 'none', 
            border: 'none', 
            color: '#FFF5E1', 
            cursor: 'pointer', 
            fontSize: '18px',
            transition: 'all 0.3s',
            minWidth: '40px',
            minHeight: '40px',
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
              transition: 'all 0.3s',
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
            transition: 'all 0.3s',
            minHeight: '40px',
          }} 
          onFocus={(e) => e.target.style.borderColor = '#C19A6B'}
          onBlur={(e) => e.target.style.borderColor = '#D2B48C'}
        />
      </div>
    </div>
  );
}

function FeedbackForm({ onClose }) {
  const [feedback, setFeedback] = useState('');
  const { language } = useLanguage();
  const t = translations[language];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedback);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '300px',
      background: '#FFF5E1',
      border: '2px solid #D2B48C',
      borderRadius: '10px',
      padding: '20px',
      zIndex: 1000,
      boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
    }}>
      <h3 style={{ margin: '0 0 15px', fontSize: '18px', color: '#4A3728' }}>
        {language === 'ar' ? 'إرسال تعليق' : 'Send Feedback'}
      </h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder={language === 'ar' ? 'اكتب تعليقك هنا...' : 'Write your feedback here...'}
          style={{
            width: '100%',
            height: '100px',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #D2B48C',
            background: '#F5F5DC',
            color: '#4A3728',
            resize: 'none',
            outline: 'none',
            transition: 'all 0.3s',
            fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif",
          }}
          onFocus={(e) => e.target.style.borderColor = '#C19A6B'}
          onBlur={(e) => e.target.style.borderColor = '#D2B48C'}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: '#D2B48C',
              color: '#FFF5E1',
              padding: '8px 15px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              minWidth: '40px',
              minHeight: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#C19A6B'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#D2B48C'}
          >
            {language === 'ar' ? 'إلغاء' : 'Cancel'}
          </button>
          <button
            type="submit"
            style={{
              background: '#D2B48C',
              color: '#FFF5E1',
              padding: '8px 15px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              minWidth: '40px',
              minHeight: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#C19A6B'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#D2B48C'}
          >
            {language === 'ar' ? 'إرسال' : 'Submit'}
          </button>
        </div>
      </form>
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
  const [isChatAutoOpened, setIsChatAutoOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
    const timer = setTimeout(() => {
      setShowChat(true);
      setIsChatAutoOpened(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

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
    setIsChatAutoOpened(false);
  };

  const handleFeedbackClose = () => {
    setShowFeedback(false);
  };

  return (
    <html lang={language} dir={direction}>
      <head>
        <title>{t.platformName}</title>
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@800&family=Roboto:wght@800&family=Cairo:wght@900&family=Amiri:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ 
        fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", 
        background: 'linear-gradient(to bottom, #F5F5DC, #F8F1E3)', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
      }}>
        {isLoading && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(255,255,255,0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000,
          }}>
            <div style={{
              border: '4px solid #D2B48C',
              borderTop: '4px solid #D2B48C',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              animation: 'spin 1s linear infinite',
            }} />
          </div>
        )}
        <header style={{ 
          background: 'linear-gradient(to right, #F5EAD0, #EDE0B0)', 
          padding: '10px 20px', 
          minHeight: '70px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          color: '#4A3728', 
          fontWeight: '800', 
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', order: language === 'ar' ? 1 : 0 }}>
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowSearch(!showSearch)} 
                data-tooltip={language === 'ar' ? 'ابحث عن المواد الدراسية' : 'Search for study materials'}
                style={{ 
                  backgroundColor: '#EDE0B0', 
                  padding: '10px', 
                  borderRadius: '10px', 
                  border: 'none', 
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)', 
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  minWidth: '40px',
                  minHeight: '40px',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(10deg)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
              >
                <IoSearch size={26} color='#FFF5E1' />
              </button>
              {showSearch && (
                <form onSubmit={handleSearch} style={{ position: 'absolute', top: '50px', left: 0, zIndex: 1000 }}>
                  <input 
                    type="text" 
                    placeholder={t.searchPlaceholder} 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    style={{ 
                      padding: '8px', 
                      borderRadius: '8px', 
                      border: '1px solid #D2B48C', 
                      width: '220px',
                      backgroundColor: '#FFF5E1',
                      color: '#4A3728',
                      fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif",
                      transition: 'all 0.3s',
                      minHeight: '40px',
                    }} 
                    autoFocus 
                  />
                </form>
              )}
            </div>
            <Link href="/aboutus" style={{ minWidth: '40px', minHeight: '40px', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <button 
                data-tooltip={language === 'ar' ? 'عن المنصة' : 'About Us'}
                style={{ 
                  backgroundColor: '#EDE0B0', 
                  padding: '10px', 
                  borderRadius: '10px', 
                  border: 'none', 
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)', 
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  minWidth: '40px',
                  minHeight: '40px',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(10deg)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
              >
                <span style={{ color: '#FFF5E1', fontSize: '16px', fontWeight: 'bold' }}>
                  {language === 'ar' ? 'عن' : 'About'}
                </span>
              </button>
            </Link>
            {session && (
              <Link href="/profile" style={{ minWidth: '40px', minHeight: '40px', display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  overflow: 'hidden', 
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <img 
                    src={session.user.image || ''} 
                    alt="User" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
              </Link>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', order: language === 'ar' ? 0 : 1 }}>
            <Link href="/" style={{ minWidth: '40px', minHeight: '40px', display: 'flex', alignItems: 'center' }}>
              <img 
                src="/logo.png" 
                alt="شعار سكيب" 
                style={{ width: '70px', height: '70px', borderRadius: '50%', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))', transition: 'all 0.3s' }} 
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} 
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} 
              />
            </Link>
            <span style={{ 
              color: '#4A3728', 
              fontSize: '28px', 
              fontWeight: '900', 
              fontFamily: "'Cairo', sans-serif", 
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)', 
              textDecoration: 'none', 
              cursor: 'default',
              transition: 'all 0.3s',
            }}>
              سكيب
            </span>
          </div>
        </header>
        <button 
          onClick={() => setShowChat(true)} 
          style={{ 
            position: 'fixed', 
            bottom: '80px', 
            right: '20px', 
            zIndex: 1000, 
            background: 'linear-gradient(to right, #F5EAD0, #EDE0B0)', 
            borderRadius: '50%', 
            padding: '15px', 
            border: 'none', 
            cursor: 'pointer', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)', 
            transition: 'all 0.3s',
            minWidth: '40px',
            minHeight: '40px',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <IoChatboxEllipses size={40} color='#FFF5E1' />
        </button>
        {showChat && <MiniChat onClose={handleChatClose} isAutoOpened={isChatAutoOpened} />}
        <main style={{ 
          flex: 1, 
          padding: '20px', 
          overflowY: 'auto',
          color: '#3A2B1F',
        }}>
          {children}
        </main>
        {showFeedback && <FeedbackForm onClose={handleFeedbackClose} />}
        <footer style={{ 
          padding: '0 10px', 
          minHeight: '40px', 
          color: '#3A2B1F', 
          fontWeight: 'bold',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          boxSizing: 'border-box',
          background: '#F8F1E3',
          overflowX: 'hidden',
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            gap: '5px',
            width: '100%',
          }}>
            {/* قسم التواصل */}
            <div style={{ display: 'flex', gap: '5px', order: language === 'ar' ? 3 : 1, alignItems: 'center' }}>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=nourhanmatwally@gmail.com&su=استفسار%20عن%20المنصة&body=مرحبًا،%20أود%20الاستفسار%20عن..." 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ transition: 'all 0.3s', minWidth: '30px', minHeight: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.color = '#C19A6B';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.color = '#3A2B1F';
                }}
              >
                <IoMail size={22} color='#3A2B1F' />
              </a>
              <a 
                href="https://wa.me/01284423601" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ transition: 'all 0.3s', minWidth: '30px', minHeight: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.color = '#C19A6B';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.color = '#3A2B1F';
                }}
              >
                <IoLogoWhatsapp size={22} color='#3A2B1F' />
              </a>
            </div>
            {/* قسم الروابط */}
            <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', order: language === 'ar' ? 1 : 3, alignItems: 'center', textAlign: language === 'ar' ? 'right' : 'left' }}>
              <button 
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                style={{ 
                  background: '#D2B48C', 
                  color: '#FFF5E1', 
                  width: '30px', 
                  height: '30px', 
                  borderRadius: '50%', 
                  border: 'none', 
                  fontSize: '12px', 
                  fontWeight: 'bold', 
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#C19A6B';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#D2B48C';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {language === 'ar' ? "EN" : "AR"}
              </button>
              <Link 
                href="/faq" 
                style={{ 
                  background: '#D2B48C', 
                  color: '#FFF5E1', 
                  width: '30px', 
                  height: '30px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  textDecoration: 'none', 
                  fontSize: '12px', 
                  fontWeight: 'bold',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#C19A6B';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#D2B48C';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                FAQ
              </Link>
            </div>
            {/* قسم المعلومات (كرابط لـ Privacy) */}
            <div style={{ display: 'flex', alignItems: 'center', order: 2, gap: '5px', textAlign: 'center' }}>
              <Link href="/privacy" style={{ textDecoration: 'none' }}>
                <p style={{ margin: '0 5px', fontSize: '10px', color: '#4A3728', opacity: 0.8, transition: 'all 0.3s' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#C19A6B';
                    e.currentTarget.style.opacity = 1;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#4A3728';
                    e.currentTarget.style.opacity = 0.8;
                  }}
                >
                  © 2025 {language === 'ar' ? "كل الحقوق محفوظة" : "All Rights Reserved"}
                </p>
              </Link>
            </div>
          </div>
        </footer>
        <style jsx>{`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #F8F1E3;
          }
          ::-webkit-scrollbar-thumb {
            background: #D2B48C;
            border-radius: 4px;
          }
          [data-tooltip] {
            position: relative;
          }
          [data-tooltip]:hover:after {
            content: attr(data-tooltip);
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            background: #4A3728;
            color: #FFF5E1;
            padding: 5px 10px;
            borderRadius: '5px';
            font-size: 12px;
            white-space: nowrap;
            zIndex: 1000;
          }
          @media (max-width: 768px) {
            main {
              padding: 15px;
            }
            footer {
              padding: 0 5px;
            }
          }
          @media (max-width: 600px) {
            main {
              padding: 10px;
            }
            footer {
              padding: 0 5px;
            }
            footer a svg {
              width: 18px;
              height: 18px;
            }
            footer p {
              font-size: 10px;
            }
            footer a {
              font-size: 10px;
            }
          }
        `}</style>
      </body>
    </html>
  );
}