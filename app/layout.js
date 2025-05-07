"use client";

import './globals.css';
import { SessionProvider, useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoSearch, IoChatboxEllipses, IoMail, IoLogoWhatsapp, IoMenu, IoClose } from 'react-icons/io5';
import { translations } from '../lib/translations';
import { LanguageProvider, useLanguage } from '../lib/LanguageContext';

function MiniChat({ onClose }) {
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
    <div style={{
      position: 'fixed',
      bottom: '80px',
      right: '20px',
      width: '300px',
      height: '400px',
      backgroundColor: '#FFF5E1',
      border: '1px solid #D2B48C',
      borderRadius: '10px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
    }}>
      <div style={{ padding: '10px', backgroundColor: '#D2B48C', color: '#FFF5E1', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>{t.learningAssistant}</h3>
        <div style={{ display: 'flex', gap: '5px' }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#FFF5E1', cursor: 'pointer' }}>
            <span style={{ fontSize: '20px' }}>-</span>
          </button>
          <Link href="/chat" style={{ color: '#FFF5E1', textDecoration: 'none' }}>
            <span style={{ fontSize: '20px' }}>...</span>
          </Link>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px', direction }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: msg.sender === 'user' ? (language === 'ar' ? 'flex-end' : 'flex-start') : (language === 'ar' ? 'flex-start' : 'flex-end'),
              margin: '5px 0',
            }}
          >
            <div
              style={{
                maxWidth: '70%',
                padding: '8px',
                borderRadius: '8px',
                backgroundColor: msg.sender === 'user' ? '#D2B48C' : '#F5F5DC',
                color: msg.sender === 'user' ? '#FFF5E1' : '#333',
              }}
            >
              <p style={{ margin: 0, fontSize: '14px' }}>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '10px', borderTop: '1px solid #D2B48C' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t.typeQuestion}
          style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #D2B48C', fontSize: '14px' }}
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

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <html lang={language} dir={direction}>
      <head>
        <title>{t.platformName}</title>
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@800&family=Roboto:wght@800&family=Cairo:wght@700&family=Amiri:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", backgroundColor: '#F5F5DC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header style={{ backgroundColor: '#D2B48C', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#4A3728', position: 'sticky', top: 0, zIndex: 1000, fontWeight: '800' }}>
          {/* Left Section: Menu, Search, and User Image */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', order: language === 'ar' ? 1 : 0 }}>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowMenu(true)} style={{ background: 'none', border: 'none', color: '#FFF5E1', cursor: 'pointer', fontSize: '24px' }}>
                <IoMenu />
              </button>
              {showMenu && (
                <div
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
                    gap: '15px',
                    zIndex: 1000,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    minWidth: '150px'
                  }}
                >
                  <button onClick={closeMenu} style={{ background: 'none', border: 'none', color: '#D2B48C', cursor: 'pointer', alignSelf: 'flex-end', padding: '0 5px' }}>
                    <IoClose size={18} />
                  </button>
                  <Link href="/" style={{ textDecoration: 'none', color: '#1A120B', opacity: showMenu ? 1 : 0 }}>
                    <button 
                      style={{ 
                        backgroundColor: '#FFF5E1', 
                        border: 'none', 
                        cursor: 'pointer', 
                        fontSize: '18px', 
                        fontWeight: 'bold', 
                        fontFamily: "'Amiri', serif",
                        padding: '10px 15px', 
                        width: '100%', 
                        textAlign: 'start', 
                        borderBottom: '1px solid #D2B48C',
                        transition: 'background-color 0.3s, color 0.3s, border-bottom 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F5E5C1';
                        e.currentTarget.style.color = '#D2B48C';
                        e.currentTarget.style.borderBottom = '2px solid #8B5A2B';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFF5E1';
                        e.currentTarget.style.color = '#1A120B';
                        e.currentTarget.style.borderBottom = '1px solid #D2B48C';
                      }}
                    >
                      {t.home}
                    </button>
                  </Link>
                  <Link href="/materials" style={{ textDecoration: 'none', color: '#1A120B', opacity: showMenu ? 1 : 0 }}>
                    <button 
                      style={{ 
                        backgroundColor: '#FFF5E1', 
                        border: 'none', 
                        cursor: 'pointer', 
                        fontSize: '18px', 
                        fontWeight: 'bold', 
                        fontFamily: "'Amiri', serif",
                        padding: '10px 15px', 
                        width: '100%', 
                        textAlign: 'start', 
                        borderBottom: '1px solid #D2B48C',
                        transition: 'background-color 0.3s, color 0.3s, border-bottom 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F5E5C1';
                        e.currentTarget.style.color = '#D2B48C';
                        e.currentTarget.style.borderBottom = '2px solid #8B5A2B';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFF5E1';
                        e.currentTarget.style.color = '#1A120B';
                        e.currentTarget.style.borderBottom = '1px solid #D2B48C';
                      }}
                    >
                      {t.materials}
                    </button>
                  </Link>
                  <Link href="/quizzes" style={{ textDecoration: 'none', color: '#1A120B', opacity: showMenu ? 1 : 0 }}>
                    <button 
                      style={{ 
                        backgroundColor: '#FFF5E1', 
                        border: 'none', 
                        cursor: 'pointer', 
                        fontSize: '18px', 
                        fontWeight: 'bold', 
                        fontFamily: "'Amiri', serif",
                        padding: '10px 15px', 
                        width: '100%', 
                        textAlign: 'start', 
                        borderBottom: '1px solid #D2B48C',
                        transition: 'background-color 0.3s, color 0.3s, border-bottom 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F5E5C1';
                        e.currentTarget.style.color = '#D2B48C';
                        e.currentTarget.style.borderBottom = '2px solid #8B5A2B';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFF5E1';
                        e.currentTarget.style.color = '#1A120B';
                        e.currentTarget.style.borderBottom = '1px solid #D2B48C';
                      }}
                    >
                      {t.quizzes}
                    </button>
                  </Link>
                  <Link href="/discussions" style={{ textDecoration: 'none', color: '#1A120B', opacity: showMenu ? 1 : 0 }}>
                    <button 
                      style={{ 
                        backgroundColor: '#FFF5E1', 
                        border: 'none', 
                        cursor: 'pointer', 
                        fontSize: '18px', 
                        fontWeight: 'bold', 
                        fontFamily: "'Amiri', serif",
                        padding: '10px 15px', 
                        width: '100%', 
                        textAlign: 'start', 
                        borderBottom: '1px solid #D2B48C',
                        transition: 'background-color 0.3s, color 0.3s, border-bottom 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F5E5C1';
                        e.currentTarget.style.color = '#D2B48C';
                        e.currentTarget.style.borderBottom = '2px solid #8B5A2B';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFF5E1';
                        e.currentTarget.style.color = '#1A120B';
                        e.currentTarget.style.borderBottom = '1px solid #D2B48C';
                      }}
                    >
                      {t.discussions}
                    </button>
                  </Link>
                  <Link href="/projects" style={{ textDecoration: 'none', color: '#1A120B', opacity: showMenu ? 1 : 0 }}>
                    <button 
                      style={{ 
                        backgroundColor: '#FFF5E1', 
                        border: 'none', 
                        cursor: 'pointer', 
                        fontSize: '18px', 
                        fontWeight: 'bold', 
                        fontFamily: "'Amiri', serif",
                        padding: '10px 15px', 
                        width: '100%', 
                        textAlign: 'start', 
                        borderBottom: '1px solid #D2B48C',
                        transition: 'background-color 0.3s, color 0.3s, border-bottom 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F5E5C1';
                        e.currentTarget.style.color = '#D2B48C';
                        e.currentTarget.style.borderBottom = '2px solid #8B5A2B';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFF5E1';
                        e.currentTarget.style.color = '#1A120B';
                        e.currentTarget.style.borderBottom = '1px solid #D2B48C';
                      }}
                    >
                      Projects
                    </button>
                  </Link>
                  {session ? (
                    <button 
                      onClick={() => signOut({ callbackUrl: '/' })} 
                      style={{ 
                        backgroundColor: '#FFF5E1', 
                        border: 'none', 
                        color: '#D2B48C', 
                        cursor: 'pointer', 
                        fontSize: '18px', 
                        fontWeight: 'bold', 
                        fontFamily: "'Amiri', serif",
                        padding: '10px 15px', 
                        width: '100%', 
                        textAlign: 'start',
                        transition: 'background-color 0.3s, color 0.3s, border-bottom 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F5E5C1';
                        e.currentTarget.style.color = '#8B5A2B';
                        e.currentTarget.style.borderBottom = '2px solid #8B5A2B';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFF5E1';
                        e.currentTarget.style.color = '#D2B48C';
                        e.currentTarget.style.borderBottom = 'none';
                      }}
                    >
                      {t.signOut}
                    </button>
                  ) : (
                    <Link href="/login" style={{ textDecoration: 'none', color: '#D2B48C', opacity: showMenu ? 1 : 0 }}>
                      <button 
                        style={{ 
                          backgroundColor: '#FFF5E1', 
                          border: 'none', 
                          cursor: 'pointer', 
                          fontSize: '18px', 
                          fontWeight: 'bold', 
                          fontFamily: "'Amiri', serif",
                          padding: '10px 15px', 
                          width: '100%', 
                          textAlign: 'start',
                          transition: 'background-color 0.3s, color 0.3s, border-bottom 0.3s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#F5E5C1';
                          e.currentTarget.style.color = '#8B5A2B';
                          e.currentTarget.style.borderBottom = '2px solid #8B5A2B';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#FFF5E1';
                          e.currentTarget.style.color = '#D2B48C';
                          e.currentTarget.style.borderBottom = 'none';
                        }}
                      >
                        {t.signIn}
                      </button>
                    </Link>
                  )}
                </div>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowSearch(!showSearch)} style={{ backgroundColor: '#C19A6B', padding: '8px', borderRadius: '8px', border: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', cursor: 'pointer' }}>
                <IoSearch size={20} color="#FFF5E1" />
              </button>
              {showSearch && (
                <form onSubmit={handleSearch} style={{ position: 'absolute', top: '40px', left: 0, zIndex: 1000 }}>
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ padding: '5px', borderRadius: '5px', border: 'none', width: '200px' }}
                    autoFocus
                  />
                </form>
              )}
            </div>
            {session && (
              <Link href="/profile">
                <Image
                  src={session.user.image}
                  alt="User"
                  width={30}
                  height={30}
                  style={{ borderRadius: '50%' }}
                />
              </Link>
            )}
          </div>

          {/* Right Section: Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', order: language === 'ar' ? 0 : 1 }}>
            <Link href="/">
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <Image src="/logo.png" alt="Logo" width={100} height={100} style={{ borderRadius: '50%' }} />
                <span style={{ color: '#8B5A2B', fontSize: '22px', fontWeight: '900', fontFamily: "'Cairo', sans-serif", textDecoration: 'none' }}>سكيب</span>
              </div>
            </Link>
          </div>
        </header>

        {/* Chat Button (Floating on Bottom Right) */}
        <button
          onClick={() => setShowChat(!showChat)}
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            zIndex: 1000,
            backgroundColor: '#FFF5E1',
            borderRadius: '50%',
            padding: '10px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          <IoChatboxEllipses size={40} color="#D2B48C" />
        </button>
        {showChat && <MiniChat onClose={() => setShowChat(false)} />}

        <main style={{ flex: 1 }}>{children}</main>

        <footer style={{ backgroundColor: '#D2B48C', padding: '20px', textAlign: 'center', color: '#3A2B1F', position: 'absolute', bottom: 0, width: '100%', fontWeight: 'bold' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', gap: '20px' }}>
            {/* Left: Contact Us Icons */}
            <div style={{ display: 'flex', gap: '10px', order: language === 'ar' ? 2 : 0 }}>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=nourhanmatwally@gmail.com&su=استفسار%20عن%20المنصة&body=مرحبًا،%20أود%20الاستفسار%20عن..." target="_blank" rel="noopener noreferrer">
                <IoMail size={20} color="#3A2B1F" />
              </a>
              <a href="https://wa.me/01284423601" target="_blank" rel="noopener noreferrer">
                <IoLogoWhatsapp size={20} color="#3A2B1F" />
              </a>
            </div>

            {/* Center: Copyright and User Guide */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <p style={{ margin: 0 }}>© 2025 {language === 'ar' ? "منصة سكيب للتعلم" : "Skip Learning Platform"}</p>
              <Link href="/user-guide" style={{ color: '#3A2B1F', textDecoration: 'none', marginTop: '10px' }}>
                {t.userGuide}
              </Link>
            </div>

            {/* Right: Language Switcher and FAQ */}
            <div style={{ display: 'flex', gap: '10px', order: language === 'ar' ? 0 : 2 }}>
              <button onClick={toggleLanguage} style={{ backgroundColor: '#FFF5E1', color: '#3A2B1F', padding: '5px 10px', borderRadius: '5px', fontWeight: 'bold' }}>
                {language === 'ar' ? "English" : "عربي"}
              </button>
              <Link href="/faq" style={{ color: '#3A2B1F', textDecoration: 'none' }}>
                {language === 'ar' ? "الأسئلة الشائعة" : "FAQ"}
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}