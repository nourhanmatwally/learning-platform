"use client";

import { useLanguage } from '../../../lib/LanguageContext';
import { translations } from '../../../lib/translations';
import { FaBook, FaCalculator, FaFlask, FaLanguage } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function Quizzes() {
  const { language } = useLanguage();
  const t = translations[language];
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  // روابط Google Forms
  const quizLinks = {
    socialStudies: "https://forms.gle/87qeqELbkyfp4Rbo7", // رابط الدراسات الحقيقي
    math: "https://forms.gle/example-math", // استبدلي الرابط ده بالرابط الحقيقي
    science: "https://forms.gle/example-science", // استبدلي الرابط ده بالرابط الحقيقي
    arabic: "https://forms.gle/example-arabic", // استبدلي الرابط ده بالرابط الحقيقي
  };

  // تتبع التقدم باستخدام localStorage
  const [completedQuizzes, setCompletedQuizzes] = useState({
    socialStudies: false,
    math: false,
    science: false,
    arabic: false,
  });

  // إشعار بسيط
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // استرجاع حالة الاختبارات من localStorage
    const stored = JSON.parse(localStorage.getItem('completedQuizzes')) || {
      socialStudies: false,
      math: false,
      science: false,
      arabic: false,
    };
    setCompletedQuizzes(stored);

    // التحقق إذا الطالب رجع من Google Form
    const urlParams = new URLSearchParams(window.location.search);
    const quizCompleted = urlParams.get('quizCompleted');
    if (quizCompleted) {
      const updatedCompleted = { ...completedQuizzes, [quizCompleted]: true };
      setCompletedQuizzes(updatedCompleted);
      localStorage.setItem('completedQuizzes', JSON.stringify(updatedCompleted));
      setNotification(language === 'ar' ? `ممتاز! لقد أكملت اختبار ${quizCompleted === 'socialStudies' ? 'الدراسات' : quizCompleted === 'math' ? 'الرياضيات' : quizCompleted === 'science' ? 'العلوم' : 'العربي'}!` : `Great job! You completed the ${quizCompleted} quiz!`);
      // إزالة المعلم من الرابط
      window.history.replaceState({}, document.title, "/quizzes");
    }
  }, []);

  const handleQuizStart = (quizKey) => {
    // إضافة معلم للرابط للتعرف على الاختبار عند العودة
    window.location.href = `${quizLinks[quizKey]}?quizCompleted=${quizKey}`;
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', direction }}>
      {/* إشعار */}
      {notification && (
        <div style={{ position: 'fixed', top: '20px', backgroundColor: '#D2B48C', color: '#3A2B1F', padding: '10px 20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', zIndex: 1000 }}>
          {notification}
          <button
            onClick={() => setNotification(null)}
            style={{ marginLeft: '10px', background: 'none', border: 'none', color: '#3A2B1F', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
      )}

      <div style={{ textAlign: 'center', backgroundColor: '#FFF5E1', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
        <h1 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '1.8em', color: '#3A2B1F', marginBottom: '10px' }}>
          {t.quizzes || (language === 'ar' ? 'الاختبارات' : 'Quizzes')}
        </h1>
        <p style={{ fontSize: '1em', color: '#3A2B1F', margin: 0 }}>
          {language === 'ar' ? 'جرب اختباراتنا الممتعة لتحسين مهاراتك التقنية!' : 'Try our fun quizzes to improve your technical skills!'}
        </p>
      </div>

      {/* كاردز الاختبارات */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {/* كارد الدراسات */}
        <div
          style={{
            backgroundColor: '#FFF5E1',
            padding: '15px',
            borderRadius: '15px',
            width: '200px',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            position: 'relative',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
          }}
        >
          {completedQuizzes.socialStudies && (
            <span style={{ position: 'absolute', top: '10px', right: '10px', color: '#28a745', fontSize: '20px' }}>✔</span>
          )}
          <FaBook size={30} color="#3A2B1F" style={{ marginBottom: '10px' }} />
          <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontSize: '1.2em', color: '#3A2B1F', marginBottom: '10px' }}>
            {language === 'ar' ? 'الدراسات' : 'Social Studies'}
          </h2>
          <button
            onClick={() => handleQuizStart('socialStudies')}
            style={{
              display: 'inline-block',
              backgroundColor: '#D2B48C',
              color: '#3A2B1F',
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '14px',
              transition: 'background-color 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#C19A6B')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#D2B48C')}
          >
            {language === 'ar' ? 'ابدأ الاختبار' : 'Start Quiz'}
          </button>
        </div>

        {/* كارد الرياضيات */}
        <div
          style={{
            backgroundColor: '#FFF5E1',
            padding: '15px',
            borderRadius: '15px',
            width: '200px',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            position: 'relative',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
          }}
        >
          {completedQuizzes.math && (
            <span style={{ position: 'absolute', top: '10px', right: '10px', color: '#28a745', fontSize: '20px' }}>✔</span>
          )}
          <FaCalculator size={30} color="#3A2B1F" style={{ marginBottom: '10px' }} />
          <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontSize: '1.2em', color: '#3A2B1F', marginBottom: '10px' }}>
            {language === 'ar' ? 'الرياضيات' : 'Math'}
          </h2>
          <button
            onClick={() => handleQuizStart('math')}
            style={{
              display: 'inline-block',
              backgroundColor: '#D2B48C',
              color: '#3A2B1F',
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '14px',
              transition: 'background-color 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#C19A6B')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#D2B48C')}
          >
            {language === 'ar' ? 'ابدأ الاختبار' : 'Start Quiz'}
          </button>
        </div>

        {/* كارد العلوم */}
        <div
          style={{
            backgroundColor: '#FFF5E1',
            padding: '15px',
            borderRadius: '15px',
            width: '200px',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            position: 'relative',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
          }}
        >
          {completedQuizzes.science && (
            <span style={{ position: 'absolute', top: '10px', right: '10px', color: '#28a745', fontSize: '20px' }}>✔</span>
          )}
          <FaFlask size={30} color="#3A2B1F" style={{ marginBottom: '10px' }} />
          <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontSize: '1.2em', color: '#3A2B1F', marginBottom: '10px' }}>
            {language === 'ar' ? 'العلوم' : 'Science'}
          </h2>
          <button
            onClick={() => handleQuizStart('science')}
            style={{
              display: 'inline-block',
              backgroundColor: '#D2B48C',
              color: '#3A2B1F',
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '14px',
              transition: 'background-color 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#C19A6B')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#D2B48C')}
          >
            {language === 'ar' ? 'ابدأ الاختبار' : 'Start Quiz'}
          </button>
        </div>

        {/* كارد العربي */}
        <div
          style={{
            backgroundColor: '#FFF5E1',
            padding: '15px',
            borderRadius: '15px',
            width: '200px',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            position: 'relative',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
          }}
        >
          {completedQuizzes.arabic && (
            <span style={{ position: 'absolute', top: '10px', right: '10px', color: '#28a745', fontSize: '20px' }}>✔</span>
          )}
          <FaLanguage size={30} color="#3A2B1F" style={{ marginBottom: '10px' }} />
          <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontSize: '1.2em', color: '#3A2B1F', marginBottom: '10px' }}>
            {language === 'ar' ? 'العربي' : 'Arabic'}
          </h2>
          <button
            onClick={() => handleQuizStart('arabic')}
            style={{
              display: 'inline-block',
              backgroundColor: '#D2B48C',
              color: '#3A2B1F',
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '14px',
              transition: 'background-color 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#C19A6B')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#D2B48C')}
          >
            {language === 'ar' ? 'ابدأ الاختبار' : 'Start Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
}