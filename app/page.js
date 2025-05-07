'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { translations } from '../lib/translations';
import { useLanguage } from '../lib/LanguageContext';

export default function Home() {
  const { data: session } = useSession();
  const { language } = useLanguage();
  const t = translations[language];
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div className="container" style={{ direction, textAlign: 'center', minHeight: 'calc(100vh - 120px)' }}>
      <div
        className="welcome"
        style={{
          padding: '50px 0',
          backgroundImage: "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '10px',
          marginBottom: '20px',
          color: '#3A2B1F',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          position: 'relative',
          // Adding a semi-transparent overlay to improve text readability
          background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <h1 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', marginBottom: '10px' }}>
          {session ? (
            language === 'ar' ? (
              <>
                <span>مرحبًا</span>
                <p style={{ margin: '5px 0', fontSize: '1.2em' }}>{session.user.name}</p>
              </>
            ) : (
              <>
                <span>Hello</span>
                <p style={{ margin: '5px 0', fontSize: '1.2em' }}>{session.user.name}</p>
              </>
            )
          ) : t.welcome}
        </h1>
        <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '1.5em', margin: '10px 0' }}>
          {language === 'ar' ? 'التعلم أصبح أسهل' : 'Learning Made Easier'}
        </h2>
        <p style={{ fontSize: '1.1em', margin: '10px 0' }}>{language === 'ar' ? 'تعلم في أي وقت وأي مكان' : 'Learn Anytime, Anywhere'}</p>
        {session ? (
          <Link href="/materials">
            <button style={{ 
              marginTop: '20px', 
              backgroundColor: '#D2B48C', 
              color: '#3A2B1F', 
              padding: '20px 40px', 
              borderRadius: '10px', 
              fontWeight: 'bold', 
              fontSize: '18px',
              fontFamily: language === 'ar' ? "'Amiri', serif" : "'Roboto', sans-serif"
            }}>
              {language === 'ar' ? 'ابدأ التعلم' : 'Start Learning'}
            </button>
          </Link>
        ) : (
          <Link href="/login">
            <button style={{ 
              marginTop: '20px', 
              backgroundColor: '#D2B48C', 
              color: '#3A2B1F', 
              padding: '20px 40px', 
              borderRadius: '10px', 
              fontWeight: 'bold', 
              fontSize: '18px',
              fontFamily: language === 'ar' ? "'Amiri', serif" : "'Roboto', sans-serif"
            }}>
              {language === 'ar' ? 'ابدأ التعلم' : 'Start Learning'}
            </button>
          </Link>
        )}
      </div>
      <div className="features" style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', margin: '40px 0' }}>
        <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '1.5em', width: '100%', marginBottom: '20px' }}>
          {t.whyChooseUs}
        </h2>
        <div
          style={{
            backgroundColor: '#FFF5E1',
            padding: '20px',
            borderRadius: '20px',
            width: '250px',
            textAlign: 'center',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease',
            cursor: 'pointer',
            backdropFilter: 'blur(5px)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            e.currentTarget.style.backdropFilter = 'blur(10px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
            e.currentTarget.style.backdropFilter = 'blur(5px)';
          }}
          onClick={() => alert(language === 'ar' ? 'تعرف على المزيد عن منصتنا!' : 'Learn more about our platform!')}
        >
          <p style={{ margin: 0, fontSize: '16px' }}>{t.anytimeAnywhere}</p>
        </div>
        <div
          style={{
            backgroundColor: '#FFF5E1',
            padding: '20px',
            borderRadius: '20px',
            width: '250px',
            textAlign: 'center',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease',
            cursor: 'pointer',
            backdropFilter: 'blur(5px)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            e.currentTarget.style.backdropFilter = 'blur(10px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
            e.currentTarget.style.backdropFilter = 'blur(5px)';
          }}
          onClick={() => alert(language === 'ar' ? 'واجهة سهلة ومريحة للاستخدام!' : 'Easy and comfortable interface!')}
        >
          <p style={{ margin: 0, fontSize: '16px' }}>{t.userFriendly}</p>
        </div>
        <div
          style={{
            backgroundColor: '#FFF5E1',
            padding: '20px',
            borderRadius: '20px',
            width: '250px',
            textAlign: 'center',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease',
            cursor: 'pointer',
            backdropFilter: 'blur(5px)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            e.currentTarget.style.backdropFilter = 'blur(10px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
            e.currentTarget.style.backdropFilter = 'blur(5px)';
          }}
          onClick={() => alert(language === 'ar' ? 'مواد تعليمية متنوعة تناسب الجميع!' : 'Diverse materials for everyone!')}
        >
          <p style={{ margin: 0, fontSize: '16px' }}>{t.diverseMaterials}</p>
        </div>
      </div>
    </div>
  );
}