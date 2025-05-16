"use client";

import './globals.css';
import { SessionProvider, useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { IoSearch, IoMail, IoLogoWhatsapp } from 'react-icons/io5';
import { LanguageProvider, useLanguage } from '../lib/LanguageContext';
import { faqDatabase } from '../lib/faqData';
import Image from 'next/image';
import { Tajawal, Roboto } from 'next/font/google';

const tajawal = Tajawal({ weight: '800', subsets: ['arabic'] });
const roboto = Roboto({ weight: '800', subsets: ['latin'] });

function MiniChat({ onClose, isAutoOpened }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isClosedPermanently, setIsClosedPermanently] = useState(false);
  const { language, session } = useLanguage();
  const direction = language === 'ar' ? 'rtl' : 'ltr';
  const chatContainerRef = useRef(null);

  const welcomeMessage = language === 'ar' ? `مرحبًا ${session?.user?.name?.split(' ')[0] || 'يا طالب'}! اساعدك ازاي؟` : `Hi ${session?.user?.name?.split(' ')[0] || 'Student'}! Need help?`;

  useEffect(() => {
    if (!messages.length) {
      setMessages([{ text: welcomeMessage, sender: 'system' }]);
    }
    scrollToBottom();
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

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: 'user' }]);

    const cleanedInput = cleanText(input);

    let autoResponse = null;
    let matchedQuestion = null;

    const faqSections = language === 'ar'
      ? [
          faqDatabase.general.ar,
          faqDatabase.studies.ar,
          faqDatabase.virtualClassSkills.ar,
          faqDatabase.projectsDiscussions.ar,
          faqDatabase.googleClassroom.ar,
        ]
      : [
          faqDatabase.general.en,
          faqDatabase.studies.en,
          faqDatabase.virtualClassSkills.en,
          faqDatabase.projectsDiscussions.en,
          faqDatabase.googleClassroom.en,
        ];

    if (language === 'ar') {
      matchedQuestion = faqSections
        .map(section => section[cleanedInput])
        .find(answer => answer);

      if (!matchedQuestion) {
        const matches = faqSections.map(section => findClosestMatch(cleanedInput, section));
        const bestMatchIndex = matches.findIndex(match => match);
        if (bestMatchIndex !== -1) {
          matchedQuestion = faqSections[bestMatchIndex][matches[bestMatchIndex]];
        }
      }

      if (!matchedQuestion) {
        const customResponses = {
          'عامل إيه': 'أنا تمام! وإنت عاملة إيه؟',
          'ازيك': 'أنا كويس جدًا، شكرًا! وأنت ازيك؟',
          'عرفني بالمنصة': 'سكيب منصة تعليمية تفاعلية تساعد الطلاب على الدراسة بسهولة، مع دروس، مهام، ودردشة!',
          'كلمني عن المنصة': 'سكيب منصة حديثة للتعليم، تقدم دروس، جدول زمني، ودعم مباشر عبر الشات.',
          'إيه هي المنصة دي': 'سكيب هي منصة تعليمية عربية تركز على تطوير مهارات الطلاب بطريقة ممتعة ومنظمة.',
          'المنصة هتفيدني بإيه كطالب': 'سكيب هتساعدك تتابع دروسك، تشتغلي على مهامك، وتتفاعلي مع المعلمين بسهولة.',
          'كيف أستخدم المنصة': 'سجلي دخولك، اختاري موادك من القائمة، واستخدمي الشات للدعم!',
          'متى الدروس': 'الدروس متوفرة حسب الجدول الزمني في صفحتك الشخصية، تفقديه يوميًا!',
          'تقدر تساعدني ازاي': 'أكيد، اسأليني أي حاجة عن الدراسة أو المنصة، زي مواعيد الامتحانات أو كيفية الدخول للفصول!',
        };

        autoResponse = customResponses[cleanedInput] || `سأجيب عن هذا السؤال في وقت لاحق! جرب اسئلة اخري. وسأساعدك 👀`;
        if (!customResponses[cleanedInput]) {
          const timestamp = new Date().toISOString();
          const notificationData = { question: input, userId: session?.user?.id || 'Anonymous', timestamp };
          try {
            await fetch('/api/notify-developer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(notificationData) });
          } catch (err) {
            console.error('Error notifying developer:', err);
          }
        }
      } else {
        autoResponse = matchedQuestion;
      }
    } else {
      matchedQuestion = faqSections
        .map(section => section[cleanedInput])
        .find(answer => answer);

      if (!matchedQuestion) {
        const matches = faqSections.map(section => findClosestMatch(cleanedInput, section));
        const bestMatchIndex = matches.findIndex(match => match);
        if (bestMatchIndex !== -1) {
          matchedQuestion = faqSections[bestMatchIndex][matches[bestMatchIndex]];
        }
      }

      if (!matchedQuestion) {
        const customResponses = {
          'how are you': 'I’m doing great, thanks! How about you?',
          'tell me about the platform': 'Skype is an interactive educational platform that helps students study easily with lessons, tasks, and chat!',
          'what is this platform': 'Skype is a modern Arabic educational platform focused on developing student skills in a fun and organized way.',
          'how can the platform help me as a student': 'Skype will help you track your lessons, work on tasks, and interact with teachers easily.',
          'how do i use the platform': 'Log in, choose your subjects from the menu, and use the chat for support!',
          'when are the lessons': 'Lessons are available according to your schedule on your profile page, check it daily!',
          'how can you help me': 'Sure, ask me anything about studying or the platform, like exam dates or how to join classes!',
        };

        autoResponse = customResponses[cleanedInput.toLowerCase()] || `I will respond soon, Try Another question, and I'll answer you. 👀`;
        if (!customResponses[cleanedInput.toLowerCase()]) {
          const timestamp = new Date().toISOString();
          const notificationData = { question: input, userId: session?.user?.id || 'Anonymous', timestamp };
          try {
            await fetch('/api/notify-developer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(notificationData) });
          } catch (err) {
            console.error('Error notifying developer:', err);
          }
        }
      } else {
        autoResponse = matchedQuestion;
      }
    }

    if (autoResponse) {
      setMessages(prevMessages => [...prevMessages, { text: autoResponse, sender: 'system' }]);
    }
    setInput('');
    scrollToBottom();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleMinimize = () => {
    onClose();
  };

  const handlePermanentClose = () => {
    setMessages([{ text: welcomeMessage, sender: 'system' }]);
    setIsClosedPermanently(true);
    onClose();
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  if (isClosedPermanently && !isAutoOpened) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: window.innerWidth <= 600 ? '0' : '80px',
      right: window.innerWidth <= 600 ? '0' : '20px',
      width: window.innerWidth <= 600 ? '100%' : '320px',
      height: window.innerWidth <= 600 ? '80vh' : '450px',
      backgroundColor: '#FFF5E1',
      border: '2px solid #8A9A5B',
      borderRadius: window.innerWidth <= 600 ? '15px 15px 0 0' : '15px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
      overflow: 'hidden',
      fontFamily: language === 'ar' ? tajawal.style.fontFamily : roboto.style.fontFamily,
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
          <button
            onClick={handleMinimize}
            style={{
              backgroundColor: '#8A9A5B',
              color: '#FFF5E1',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6F8050'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8A9A5B'}
          >
            ⬇️
          </button>
          <Link href="/chat" onClick={handleMinimize}>
            <button
              style={{
                backgroundColor: '#8A9A5B',
                color: '#FFF5E1',
                padding: '8px 12px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6F8050'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8A9A5B'}
            >
              {language === 'ar' ? 'تحدث بارتياح' : 'Chat Comfortably'}
            </button>
          </Link>
          <button
            onClick={handlePermanentClose}
            style={{
              backgroundColor: '#6F8050',
              color: '#FFF5E1',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#8A9A5B'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6F8050'}
          >
            ❌
          </button>
        </div>
      </div>
      <div ref={chatContainerRef} style={{
        flex: 1,
        overflowY: 'auto',
        padding: '15px',
        direction,
        backgroundColor: '#FFF5E1',
        borderBottom: '1px solid #8A9A5B',
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
              background: msg.sender === 'user' ? '#6F8050' : '#F5E5C1',
              color: msg.sender === 'user' ? '#FFF5E1' : '#4A3728',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.3s',
            }}>
              <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.4' }}>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '12px', backgroundColor: '#FFF5E1' }}>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your question..."
          style={{
            width: '90%',
            padding: '10px',
            borderRadius: '20px',
            border: '1px solid #8A9A5B',
            fontSize: '15px',
            outline: 'none',
            background: '#F5F5DC',
            transition: 'all 0.3s',
            minHeight: '40px',
            margin: '0 auto',
            display: 'block',
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = '#6F8050'}
          onBlur={(e) => e.currentTarget.style.borderColor = '#8A9A5B'}
        />
      </div>
    </div>
  );
}

function FeedbackForm({ onClose }) {
  const [feedback, setFeedback] = useState('');
  const { language } = useLanguage();

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
      backgroundColor: '#FFF5E1',
      border: '2px solid #8A9A5B',
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
            border: '1px solid #8A9A5B',
            backgroundColor: '#F5F5DC',
            color: '#4A3728',
            resize: 'none',
            outline: 'none',
            transition: 'all 0.3s',
            fontFamily: language === 'ar' ? tajawal.style.fontFamily : roboto.style.fontFamily,
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = '#6F8050'}
          onBlur={(e) => e.currentTarget.style.borderColor = '#8A9A5B'}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              backgroundColor: '#8A9A5B',
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
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6F8050'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8A9A5B'}
          >
            {language === 'ar' ? 'إلغاء' : 'Cancel'}
          </button>
          <button
            type="submit"
            style={{
              backgroundColor: '#8A9A5B',
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
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6F8050'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8A9A5B'}
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

  const handleChatClose = () => {
    setShowChat(false);
    setIsChatAutoOpened(false);
  };

  const handleFeedbackClose = () => {
    setShowFeedback(false);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/signin');
  };

  return (
    <html lang={language} dir={direction} className={language === 'ar' ? tajawal.className : roboto.className}>
      <head>
        <title>Skype Platform</title>
      </head>
      <body style={{
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
              border: '4px solid #8A9A5B',
              borderTop: '4px solid #8A9A5B',
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
          color: '#3A2B1F',
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
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      border: '1px solid #8A9A5B',
                      width: '220px',
                      backgroundColor: '#FFF5E1',
                      color: '#4A3728',
                      fontFamily: language === 'ar' ? tajawal.style.fontFamily : roboto.style.fontFamily,
                      transition: 'all 0.3s',
                      minHeight: '40px',
                    }}
                    autoFocus
                  />
                </form>
              )}
            </div>
            <Link href="/privacy" style={{ minWidth: '40px', minHeight: '40px', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <button
                data-tooltip={language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
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
                  {language === 'ar' ? 'سياستنا' : 'Policy'}
                </span>
              </button>
            </Link>
            {session ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {session.user.image ? (
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
                      <Image
                        src={session.user.image}
                        alt="User"
                        width={40}
                        height={40}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </Link>
                ) : (
                  <Link href="/profile" style={{ minWidth: '40px', minHeight: '40px', display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: '#EDE0B0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <span style={{ fontSize: '20px', color: '#6F8050' }}>👤</span>
                    </div>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  style={{
                    backgroundColor: '#6F8050',
                    color: '#FFF5E1',
                    padding: '10px 15px',
                    borderRadius: '10px',
                    border: 'none',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    minWidth: '40px',
                    minHeight: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: 'bold',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#8A9A5B';
                    e.currentTarget.style.transform = 'scale(1.1) rotate(10deg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#6F8050';
                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                  }}
                >
                  {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                </button>
              </div>
            ) : (
              <Link href="/signin" style={{ minWidth: '40px', minHeight: '40px', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <button style={{
                  backgroundColor: '#8A9A5B',
                  color: '#FFF5E1',
                  padding: '5px 15px',
                  borderRadius: '5px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6F8050'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8A9A5B'}
                >
                  {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                </button>
              </Link>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', order: language === 'ar' ? 0 : 1 }}>
            <Link href="/" style={{ minWidth: '40px', minHeight: '40px', display: 'flex', alignItems: 'center' }}>
              <Image
                src="/logo.png"
                alt="شعار سكيب"
                width={70}
                height={70}
                style={{ borderRadius: '50%', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))', transition: 'all 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </Link>
            <span style={{
              color: '#3A2B1F',
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
            background: '#FFF5E1',
            borderRadius: '50%',
            padding: '15px',
            border: '2px solid #8A9A5B',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transition: 'all 0.3s',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Image
            src="/chatbot-face.png"
            alt="Chatbot Face"
            width={40}
            height={40}
            style={{ borderRadius: '50%' }}
          />
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
          backgroundColor: '#F8F1E3',
          overflowX: 'hidden',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '5px',
            width: '100%',
          }}>
            <div style={{ display: 'flex', gap: '5px', order: language === 'ar' ? 3 : 1, alignItems: 'center' }}>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=nourhanmatwally@gmail.com&su=استفسار%20عن%20المنصة&body=مرحبًا،%20أود%20الاستفسار%20عن..."
                target="_blank"
                rel="noopener noreferrer"
                style={{ transition: 'all 0.3s', minWidth: '30px', minHeight: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.color = '#6F8050';
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
                  e.currentTarget.style.color = '#6F8050';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.color = '#3A2B1F';
                }}
              >
                <IoLogoWhatsapp size={22} color='#3A2B1F' />
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', order: language === 'ar' ? 1 : 3, alignItems: 'center', textAlign: language === 'ar' ? 'right' : 'left' }}>
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                style={{
                  backgroundColor: '#8A9A5B',
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
                  e.currentTarget.style.backgroundColor = '#6F8050';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#8A9A5B';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {language === 'ar' ? 'EN' : 'AR'}
              </button>
              <Link
                href="/faq"
                style={{
                  backgroundColor: '#8A9A5B',
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
                  e.currentTarget.style.backgroundColor = '#6F8050';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#8A9A5B';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                FAQ
              </Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', order: 2, gap: '5px', textAlign: 'center' }}>
              <p style={{ margin: '0 5px', fontSize: '10px', color: '#4A3728', opacity: 0.8, transition: 'all 0.3s' }}>
                © 2025 {language === 'ar' ? 'كل الحقوق محفوظة' : 'All Rights Reserved'}
              </p>
            </div>
          </div>
        </footer>
        <style>{`
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
            background: #8A9A5B;
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
              height: '18px';
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