"use client";

import { useLanguage } from '../lib/LanguageContext';
import { translations } from '../lib/translations';

export default function Classroom() {
  const { language } = useLanguage();
  const t = translations[language];
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'calc(100vh - 150px)',
      backgroundColor: '#F5F5DC',
      padding: '20px',
      direction,
      fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif",
    }}>
      <div style={{
        textAlign: 'center',
        background: 'linear-gradient(135deg, #FFF5E1 0%, #F5E5C1 100%)',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
        border: '2px solid #D2B48C',
      }}>
        <h1 style={{
          color: '#4A3728',
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '20px',
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
        }}>
          {t.classroomTitle}
        </h1>
        <p style={{
          color: '#4A3728',
          fontSize: '16px',
          marginBottom: '20px',
        }}>
          {t.classroomDescription}
        </p>
        <a href="https://classroom.google.com" target="_blank" rel="noopener noreferrer">
          <button style={{
            background: 'linear-gradient(to right, #D2B48C, #C19A6B)',
            color: '#FFF5E1',
            padding: '12px 25px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            transition: 'transform 0.3s, background 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.background = 'linear-gradient(to right, #C19A6B, #D2B48C)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.background = 'linear-gradient(to right, #D2B48C, #C19A6B)';
          }}>
            {t.joinClassroom}
          </button>
        </a>
      </div>
    </div>
  );
}