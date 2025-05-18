'use client';

  import { useState, useEffect } from 'react';
  import { translations } from '../../lib/translations';
  import { useSession } from 'next-auth/react';
  import axios from 'axios';
  import { FaQuestionCircle, FaBook } from 'react-icons/fa';

  const QuizzesContent = ({ language }) => {
    const { data: session } = useSession();
    const t = translations[language];
    const [completedQuizzes, setCompletedQuizzes] = useState([]);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
      const fetchQuizzes = async () => {
        if (session?.user?.id) {
          try {
            const response = await axios.get(`/api/quizzes?userId=${session.user.id}`);
            setCompletedQuizzes(response.data);
          } catch (error) {
            console.error('Error fetching quizzes:', error);
          }
        }
      };
      fetchQuizzes();

      const urlParams = new URLSearchParams(window.location.search);
      const quizCompleted = urlParams.get('quizCompleted');
      if (quizCompleted && session?.user?.id) {
        const score = Math.floor(Math.random() * 101); // مثال: درجة عشوائية
        axios.post('/api/quizzes', { userId: session.user.id, quizName: quizCompleted, score });
        setNotification(language === 'ar' ? 'ممتاز! لقد أكملت اختبار الدراسات!' : 'Great job! You completed the Social Studies quiz!');
      }
    }, [session]);

    const handleQuizStart = (quizKey) => {
      window.location.href = `https://forms.gle/87qeqELbkyfp4Rbo7?quizCompleted=${quizKey}`;
    };

    return (
      <div style={{ padding: '20px', textAlign: language === 'ar' ? 'right' : 'left', backgroundColor: '#FFF5E1', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', minHeight: '200px', height: 'auto', display: 'flex', flexDirection: 'column', maxHeight: '600px', overflowY: 'auto' }}>
        {notification && (
          <div style={{ position: 'relative', backgroundColor: '#D2B48C', color: '#3A2B1F', padding: '10px 20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', marginBottom: '20px' }}>
            {notification}
            <button onClick={() => setNotification(null)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: '#3A2B1F', cursor: 'pointer' }} aria-label={language === 'ar' ? 'إغلاق الإشعار' : 'Close notification'}>✕</button>
          </div>
        )}
        <h2 style={{ color: '#3A2B1F', fontSize: '24px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaQuestionCircle color="#D2B48C" /> {t.quizzes}
        </h2>
        <p style={{ color: '#4A3728', fontSize: '16px', marginBottom: '20px' }}>
          {language === 'ar' ? 'جرب اختباراتنا الممتعة لتحسين مهاراتك التقنية!' : 'Try our fun quizzes to improve your technical skills!'}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {[{ key: 'socialStudies', icon: <FaBook size={30} />, name: language === 'ar' ? 'الدراسات' : 'Social Studies' }].map((quiz) => (
            <div key={quiz.key} style={{ backgroundColor: '#FFF5E1', padding: '15px', borderRadius: '15px', width: '200px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'pointer', position: 'relative' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'; }}>
              {completedQuizzes.some(q => q.quizName === quiz.key) && <span style={{ position: 'absolute', top: '10px', right: '10px', color: '#28a745', fontSize: '20px' }}>✔</span>}
              {quiz.icon}
              <h3 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontSize: '1.2em', color: '#3A2B1F', margin: '10px 0' }}>{quiz.name}</h3>
              <button onClick={() => handleQuizStart(quiz.key)} style={{ backgroundColor: '#D2B48C', color: '#3A2B1F', padding: '8px 16px', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#C19A6B')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#D2B48C')} aria-label={language === 'ar' ? `ابدأ اختبار ${quiz.name}` : `Start ${quiz.name} quiz`}>
                {language === 'ar' ? 'ابدأ الاختبار' : 'Start Quiz'}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default QuizzesContent;