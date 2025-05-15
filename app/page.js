'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { translations } from '../lib/translations';
import { useLanguage } from '../lib/LanguageContext';
import Image from 'next/image';

export default function Home() {
  const { data: session } = useSession();
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div className="container" style={{ 
      direction, 
      textAlign: 'center', 
      minHeight: 'calc(100vh - 150px)', 
      display: 'flex', 
      flexDirection: 'column', 
      padding: '20px',
      width: '100%', 
      boxSizing: 'border-box', 
      overflowX: 'hidden', 
    }}>
      {/* Combined Container: Image Card + Welcome Message */}
      <div
        className="welcome-section"
        style={{
          display: 'flex',
          flexDirection: language === 'ar' ? 'row' : 'row-reverse',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '30px',
          marginBottom: '30px',
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: '100%',
        }}
      >
        {/* Image Card */}
        <div
          className="welcome-image-card"
          style={{
            position: 'relative',
            width: '200px',
            height: '200px',
            flexShrink: 0,
          }}
        >
          <Image
            src="/background-welcome.png"
            alt="Welcome Background"
            layout="fill"
            objectFit="cover"
            style={{ borderRadius: '100px 50px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
          />
        </div>

        {/* Welcome Message */}
        <div
          className="welcome-message"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            maxWidth: '500px',
          }}
        >
          <h1 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', marginBottom: '8px', fontSize: '1.8em', color: '#3A2B1F' }}>
            {session ? (
              language === 'ar' ? (
                <>
                  <span>مرحبًا</span>
                  <p style={{ margin: '4px 0', fontSize: '1.1em' }}>{session.user.name}</p>
                </>
              ) : (
                <>
                  <span>Hello</span>
                  <p style={{ margin: '4px 0', fontSize: '1.1em' }}>{session.user.name}</p>
                </>
              )
            ) : t.welcome}
          </h1>
          <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '1.4em', margin: '8px 0', color: '#3A2B1F' }}>
            {language === 'ar' ? 'التعلم أصبح أسهل' : 'Learning Made Easier'}
          </h2>
          <p style={{ fontSize: '1em', margin: '8px 0', color: '#3A2B1F' }}>{language === 'ar' ? 'تعلم في أي وقت وأي مكان' : 'Learn Anytime, Anywhere'}</p>
          {session ? (
            <Link href="/materials">
              <button 
                style={{
                  marginTop: '10px',
                  backgroundColor: '#D2B48C',
                  color: '#3A2B1F',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  fontFamily: language === 'ar' ? "'Amiri', serif" : "'Roboto', sans-serif",
                  transition: 'padding 0.3s, font-size 0.3s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.padding = '12px 24px';
                  e.currentTarget.style.fontSize = '18px';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.padding = '10px 20px';
                  e.currentTarget.style.fontSize = '16px';
                }}
              >
                {language === 'ar' ? 'ابدأ التعلم' : 'Start Learning'}
              </button>
            </Link>
          ) : (
            <Link href="/signin">
              <button 
                style={{
                  marginTop: '20px',
                  backgroundColor: '#D2B48C',
                  color: '#3A2B1F',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  fontFamily: language === 'ar' ? "'Amiri', serif" : "'Roboto', sans-serif",
                  transition: 'padding 0.3s, font-size 0.3s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.padding = '12px 24px';
                  e.currentTarget.style.fontSize = '18px';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.padding = '10px 20px';
                  e.currentTarget.style.fontSize = '16px';
                }}
              >
                {language === 'ar' ? 'ابدأ التعلم' : 'Start Learning'}
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* New Section: Why Choose Us (Oval Cards) */}
      <div
        className="why-choose-us"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px 0', flex: 1 }}
      >
        <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '1.3em', marginBottom: '15px', color: '#3A2B1F' }}>
          {t.whyChooseUs || (language === 'ar' ? 'لماذا تختار منصتنا؟' : 'Why Choose Us?')}
        </h2>
        <div
          style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}
        >
          <div
            style={{
              backgroundColor: '#FFF5E1',
              padding: '10px 20px',
              borderRadius: '50px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '200px',
              maxWidth: '300px',
              textAlign: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
            }}
            onClick={() => alert(language === 'ar' ? 'تعرف على المزيد عن منصتنا!' : 'Learn more about our platform!')}
          >
            <p style={{ margin: 0, fontSize: '14px', whiteSpace: 'normal', color: '#3A2B1F' }}>
              {language === 'ar' ? 'تعلم في أي وقت وأي مكان' : 'Learn Anytime, Anywhere'}
            </p>
          </div>
          <div
            style={{
              backgroundColor: '#FFF5E1',
              padding: '10px 20px',
              borderRadius: '50px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '200px',
              maxWidth: '300px',
              textAlign: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
            }}
            onClick={() => alert(language === 'ar' ? 'مواد تعليمية متنوعة تناسب الجميع!' : 'Diverse materials for everyone!')}
          >
            <p style={{ margin: 0, fontSize: '14px', whiteSpace: 'normal', color: '#3A2B1F' }}>
              {language === 'ar' ? 'مواد تعليمية متنوعة وتناسب الجميع' : 'Diverse Educational Materials'}
            </p>
          </div>
          <div
            style={{
              backgroundColor: '#FFF5E1',
              padding: '10px 20px',
              borderRadius: '50px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '200px',
              maxWidth: '300px',
              textAlign: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
            }}
            onClick={() => alert(language === 'ar' ? 'واجهة سهلة ومريحة للاستخدام!' : 'Easy and comfortable interface!')}
          >
            <p style={{ margin: 0, fontSize: '14px', whiteSpace: 'normal', color: '#3A2B1F' }}>
              {language === 'ar' ? 'واجهة سهلة ومريحة' : 'Easy and Comfortable Interface'}
            </p>
          </div>
        </div>

        {/* User Guide Section */}
        <div
          className="user-guide"
          style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <Link href="/student-guide">
              <div
                style={{
                  backgroundColor: '#D2B48C',
                  color: '#3A2B1F',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '180px',
                  textAlign: 'center',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
                  cursor: 'pointer',
                  border: '1px solid #3A2B1F',
                  fontWeight: 'bold',
                  fontSize: '14px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
                  e.currentTarget.style.backgroundColor = '#E5C9A0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                  e.currentTarget.style.backgroundColor = '#D2B48C';
                }}
              >
                <p style={{ margin: 0, color: '#3A2B1F' }}>
                  {language === 'ar' ? 'دليل الطالب' : 'Student Guide'}
                </p>
              </div>
            </Link>
            <Link href="/aboutus">
              <div
                style={{
                  backgroundColor: '#D2B48C',
                  color: '#3A2B1F',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '180px',
                  textAlign: 'center',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
                  cursor: 'pointer',
                  border: '1px solid #3A2B1F',
                  fontWeight: 'bold',
                  fontSize: '14px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
                  e.currentTarget.style.backgroundColor = '#E5C9A0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                  e.currentTarget.style.backgroundColor = '#D2B48C';
                }}
              >
                <p style={{ margin: 0, color: '#3A2B1F' }}>
                  {language === 'ar' ? 'عن المنصة' : 'About the Platform'}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}