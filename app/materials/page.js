'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // استيراد useRouter
import { FaHome, FaComments, FaQuestionCircle, FaProjectDiagram, FaChalkboardTeacher, FaChartLine, FaBook } from 'react-icons/fa';
import { translations } from '../../lib/translations';
import { useLanguage } from '../../lib/LanguageContext';
import Image from 'next/image'; // إضافة استيراد Image

export default function Materials() {
  const { language } = useLanguage();
  const t = translations[language];
  const direction = language === 'ar' ? 'rtl' : 'ltr';
  const [activeSection, setActiveSection] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter(); // استخدام useRouter

  const menuItems = [
    { name: t.home, path: '/', component: null, icon: <FaHome /> },
    { name: t.discussions, path: '/discussions', component: <DiscussionsContent />, icon: <FaComments /> },
    { name: t.quizzes, path: '/quizzes', component: <QuizzesContent />, icon: <FaQuestionCircle /> },
    { name: t.projects, path: '/projects', component: <ProjectsContent />, icon: <FaProjectDiagram /> },
    { name: t.classroomTitle, path: '/classroom', component: <ClassroomContent />, icon: <FaChalkboardTeacher /> },
    { name: t.results, path: '/results', component: <ResultsContent />, icon: <FaChartLine /> },
  ];

  function DiscussionsContent() {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: language === 'ar' ? 'right' : 'left', 
        backgroundColor: '#FFF5E1', 
        borderRadius: '15px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
        minHeight: '200px', 
        height: 'auto', 
        display: 'flex', 
        flexDirection: 'column', 
        maxHeight: '600px', 
        overflowY: 'auto' 
      }}>
        <h2 style={{ color: '#3A2B1F', fontSize: '24px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaComments color="#D2B48C" /> {t.discussions}
        </h2>
        <p style={{ color: '#4A3728', fontSize: '16px', marginBottom: '20px' }}>
          {language === 'ar' ? 'شارك أفكارك وناقش مع زملائك في هذا المكان التفاعلي!' : 'Share your ideas and discuss with your peers in this interactive space!'}
        </p>
        <iframe
          src="https://padlet.com/example/discussion-board"
          style={{ width: '100%', height: '400px', border: '1px solid #D2B48C', borderRadius: '10px' }}
          title="Discussion Board"
        ></iframe>
      </div>
    );
  }

  function QuizzesContent() {
    const quizLinks = {
      socialStudies: "https://forms.gle/87qeqELbkyfp4Rbo7",
    };

    const [completedQuizzes, setCompletedQuizzes] = useState({
      socialStudies: false,
    });

    const [notification, setNotification] = useState(null);

    useEffect(() => {
      const stored = JSON.parse(localStorage.getItem('completedQuizzes')) || { socialStudies: false };
      setCompletedQuizzes(stored);

      const urlParams = new URLSearchParams(window.location.search);
      const quizCompleted = urlParams.get('quizCompleted');
      if (quizCompleted) {
        const updatedCompleted = { ...stored, [quizCompleted]: true };
        setCompletedQuizzes(updatedCompleted);
        localStorage.setItem('completedQuizzes', JSON.stringify(updatedCompleted));
        setNotification(language === 'ar' ? 'ممتاز! لقد أكملت اختبار الدراسات!' : 'Great job! You completed the Social Studies quiz!');
        router.replace('/quizzes'); // استخدام router.replace بدلاً من window.history
      }
    }, [router]); // إضافة router كـ dependency

    const handleQuizStart = (quizKey) => {
      window.location.href = `${quizLinks[quizKey]}?quizCompleted=${quizKey}`;
    };

    return (
      <div style={{ 
        padding: '20px', 
        textAlign: language === 'ar' ? 'right' : 'left', 
        backgroundColor: '#FFF5E1', 
        borderRadius: '15px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
        minHeight: '200px', 
        height: 'auto', 
        display: 'flex', 
        flexDirection: 'column', 
        maxHeight: '600px', 
        overflowY: 'auto' 
      }}>
        {notification && (
          <div style={{ position: 'relative', backgroundColor: '#D2B48C', color: '#3A2B1F', padding: '10px 20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', marginBottom: '20px' }}>
            {notification}
            <button
              onClick={() => setNotification(null)}
              style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: '#3A2B1F', cursor: 'pointer' }}
              aria-label={language === 'ar' ? 'إغلاق الإشعار' : 'Close notification'}
            >
              ✕
            </button>
          </div>
        )}
        <h2 style={{ color: '#3A2B1F', fontSize: '24px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaQuestionCircle color="#D2B48C" /> {t.quizzes}
        </h2>
        <p style={{ color: '#4A3728', fontSize: '16px', marginBottom: '20px' }}>
          {language === 'ar' ? 'جرب اختباراتنا الممتعة لتحسين مهاراتك التقنية!' : 'Try our fun quizzes to improve your technical skills!'}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {[
            { key: 'socialStudies', icon: <FaBook size={30} />, name: language === 'ar' ? 'الدراسات' : 'Social Studies' },
          ].map((quiz) => (
            <div
              key={quiz.key}
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
              {completedQuizzes[quiz.key] && (
                <span style={{ position: 'absolute', top: '10px', right: '10px', color: '#28a745', fontSize: '20px' }}>✔</span>
              )}
              {quiz.icon}
              <h3 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontSize: '1.2em', color: '#3A2B1F', margin: '10px 0' }}>
                {quiz.name}
              </h3>
              <button
                onClick={() => handleQuizStart(quiz.key)}
                style={{
                  backgroundColor: '#D2B48C',
                  color: '#3A2B1F',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#C19A6B')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#D2B48C')}
                aria-label={language === 'ar' ? `ابدأ اختبار ${quiz.name}` : `Start ${quiz.name} quiz`}
              >
                {language === 'ar' ? 'ابدأ الاختبار' : 'Start Quiz'}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function ProjectsContent() {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: language === 'ar' ? 'right' : 'left', 
        backgroundColor: '#FFF5E1', 
        borderRadius: '15px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
        minHeight: '200px', 
        height: 'auto', 
        display: 'flex', 
        flexDirection: 'column', 
        maxHeight: '600px', 
        overflowY: 'auto' 
      }}>
        <h2 style={{ color: '#3A2B1F', fontSize: '24px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaProjectDiagram color="#D2B48C" /> {t.projects}
        </h2>
        <p style={{ color: '#4A3728', fontSize: '16px', marginBottom: '20px' }}>
          {language === 'ar' ? 'اعمل مع زملائك على مشاريع ممتعة وشارك إبداعاتك!' : 'Work with your peers on exciting projects and share your creations!'}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          <div style={{
            backgroundColor: '#F5E5C1',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            width: '300px',
            padding: '20px',
            transition: 'transform 0.3s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h3 style={{ color: '#3A2B1F', fontSize: '20px', marginBottom: '10px' }}>
              {language === 'ar' ? 'مشروع الرياضيات' : 'Math Project'}
            </h3>
            <p style={{ color: '#4A3728', fontSize: '16px', marginBottom: '15px' }}>
              {language === 'ar' ? 'أنشئ عرض تقديمي عن موضوع رياضي.' : 'Create a presentation on a math topic.'}
            </p>
            <a
              href="https://docs.google.com/document/d/example-math"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'linear-gradient(to right, #D2B48C, #C19A6B)',
                color: '#FFF5E1',
                padding: '10px 20px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                display: 'inline-block',
                transition: 'background 0.3s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #C19A6B, #D2B48C)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #D2B48C, #C19A6B)'}
              aria-label={language === 'ar' ? 'ابدأ مشروع الرياضيات' : 'Start Math Project'}
            >
              {language === 'ar' ? 'ابدأ المشروع' : 'Start Project'}
            </a>
          </div>
          <div style={{
            backgroundColor: '#F5E5C1',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            width: '300px',
            padding: '20px',
            transition: 'transform 0.3s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h3 style={{ color: '#3A2B1F', fontSize: '20px', marginBottom: '10px' }}>
              {language === 'ar' ? 'مشروع العلوم' : 'Science Project'}
            </h3>
            <p style={{ color: '#4A3728', fontSize: '16px', marginBottom: '15px' }}>
              {language === 'ar' ? 'قدم تجربة علمية ممتعة.' : 'Present an exciting science experiment.'}
            </p>
            <a
              href="https://docs.google.com/document/d/example-science"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'linear-gradient(to right, #D2B48C, #C19A6B)',
                color: '#FFF5E1',
                padding: '10px 20px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                display: 'inline-block',
                transition: 'background 0.3s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #C19A6B, #D2B48C)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #D2B48C, #C19A6B)'}
              aria-label={language === 'ar' ? 'ابدأ مشروع العلوم' : 'Start Science Project'}
            >
              {language === 'ar' ? 'ابدأ المشروع' : 'Start Project'}
            </a>
          </div>
          <div style={{
            backgroundColor: '#F5E5C1',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            width: '300px',
            padding: '20px',
            transition: 'transform 0.3s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h3 style={{ color: '#3A2B1F', fontSize: '20px', marginBottom: '10px' }}>
              {language === 'ar' ? 'مشروع اللغة العربية' : 'Arabic Project'}
            </h3>
            <p style={{ color: '#4A3728', fontSize: '16px', marginBottom: '15px' }}>
              {language === 'ar' ? 'اكتب قصة قصيرة أو قصيدة.' : 'Write a short story or poem.'}
            </p>
            <a
              href="https://docs.google.com/document/d/example-arabic"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'linear-gradient(to right, #D2B48C, #C19A6B)',
                color: '#FFF5E1',
                padding: '10px 20px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                display: 'inline-block',
                transition: 'background 0.3s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #C19A6B, #D2B48C)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #D2B48C, #C19A6B)'}
              aria-label={language === 'ar' ? 'ابدأ مشروع اللغة العربية' : 'Start Arabic Project'}
            >
              {language === 'ar' ? 'ابدأ المشروع' : 'Start Project'}
            </a>
          </div>
        </div>
      </div>
    );
  }

  function ClassroomContent() {
    return (
      <div style={{
        padding: '30px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #FFF5E1 0%, #F5E5C1 100%)',
        borderRadius: '15px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
        minHeight: '200px',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '600px',
        overflowY: 'auto'
      }}>
        <h2 style={{
          color: '#4A3728',
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '20px',
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
        }}>
          <FaChalkboardTeacher color="#D2B48C" /> {t.classroomTitle}
        </h2>
        <p style={{
          color: '#4A3728',
          fontSize: '16px',
          marginBottom: '20px',
        }}>
          {t.classroomDescription}
        </p>
        <a
          href="https://classroom.google.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
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
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.background = 'linear-gradient(to right, #C19A6B, #D2B48C)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.background = 'linear-gradient(to right, #D2B48C, #C19A6B)';
          }}
          aria-label={language === 'ar' ? 'انضم إلى Google Classroom' : 'Join Google Classroom'}
          >
            <FaBook size={24} color="#FFF5E1" />
            {t.joinClassroom}
          </button>
        </a>
      </div>
    );
  }

  function ResultsContent() {
    const resultsData = [
      { subject: language === 'ar' ? 'الدراسات' : 'Social Studies', score: 85, date: '2025-05-01' },
      { subject: language === 'ar' ? 'الرياضيات' : 'Math', score: 92, date: '2025-05-03' },
      { subject: language === 'ar' ? 'العلوم' : 'Science', score: 78, date: '2025-05-05' },
      { subject: language === 'ar' ? 'العربي' : 'Arabic', score: 88, date: '2025-05-07' },
    ];

    return (
      <div style={{ 
        padding: '20px', 
        textAlign: language === 'ar' ? 'right' : 'left', 
        backgroundColor: '#FFF5E1', 
        borderRadius: '15px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
        minHeight: '200px', 
        height: 'auto', 
        display: 'flex', 
        flexDirection: 'column', 
        maxHeight: '600px', 
        overflowY: 'auto' 
      }}>
        <h2 style={{ color: '#3A2B1F', fontSize: '24px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaChartLine color="#D2B48C" /> {t.results}
        </h2>
        <p style={{ color: '#4A3728', fontSize: '16px', marginBottom: '20px' }}>
          {language === 'ar' ? 'شاهد نتائجك في الاختبارات التي أكملتها.' : 'View your results for the quizzes you have completed.'}
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#F5E5C1', borderRadius: '8px', overflow: 'hidden' }}>
          <thead>
            <tr style={{ backgroundColor: '#D2B48C', color: '#3A2B1F' }}>
              <th style={{ padding: '10px', textAlign: language === 'ar' ? 'right' : 'left' }}>{language === 'ar' ? 'المادة' : 'Subject'}</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>{language === 'ar' ? 'الدرجة' : 'Score'}</th>
              <th style={{ padding: '10px', textAlign: language === 'ar' ? 'left' : 'right' }}>{language === 'ar' ? 'التاريخ' : 'Date'}</th>
            </tr>
          </thead>
          <tbody>
            {resultsData.map((result, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #D2B48C' }}>
                <td style={{ padding: '10px', textAlign: language === 'ar' ? 'right' : 'left', color: '#4A3728' }}>{result.subject}</td>
                <td style={{ padding: '10px', textAlign: 'center', color: result.score >= 80 ? '#28a745' : '#d9534f' }}>{result.score}%</td>
                <td style={{ padding: '10px', textAlign: language === 'ar' ? 'left' : 'right', color: '#4A3728' }}>{result.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div
      className="container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 150px)',
        direction,
        backgroundColor: '#F5F5DC',
        fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif",
      }}
    >
      <button
        style={{
          display: 'none',
          backgroundColor: '#D2B48C',
          color: '#3A2B1F',
          padding: '10px',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer',
          margin: '10px',
          alignSelf: language === 'ar' ? 'flex-end' : 'flex-start',
        }}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label={language === 'ar' ? 'فتح أو غلق القائمة الجانبية' : 'Open or close sidebar'}
        className="sidebar-toggle"
      >
        {isSidebarOpen ? (language === 'ar' ? 'إغلاق القائمة' : 'Close Menu') : (language === 'ar' ? 'فتح القائمة' : 'Open Menu')}
      </button>

      <div style={{ display: 'flex', flex: 1, flexDirection: language === 'ar' ? 'row-reverse' : 'row' }}>
        {/* Sidebar */}
        <div
          style={{
            width: '250px',
            background: 'linear-gradient(180deg, #FFF5E1 0%, #FFCC80 100%)',
            padding: '20px 10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            height: 'fit-content',
            minHeight: 'auto',
            maxHeight: '400px',
            position: 'sticky',
            top: '70px',
            order: language === 'ar' ? 1 : 0,
          }}
          className="sidebar"
        >
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <h2 style={{ color: '#3A2B1F', fontSize: '1.6em', marginTop: '10px', fontWeight: 'bold' }}>
              {language === 'ar' ? 'سكيب' : 'SKEP'}
            </h2>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '10px' }}>
            {menuItems.map((item, index) => (
              <div key={index} style={{ position: 'relative' }}>
                {item.path === '/' ? (
                  <Link href="/" style={{ textDecoration: 'none' }}>
                    <button
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        minHeight: '45px',
                        background: activeSection === 'home' ? 'linear-gradient(to right, #D2B48C, #C19A6B)' : '#F5E5C1',
                        color: activeSection === 'home' ? '#FFF5E1' : '#3A2B1F',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontFamily: language === 'ar' ? "'Amiri', serif" : "'Roboto', sans-serif",
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: activeSection === 'home' ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 6px rgba(0,0,0,0.1)',
                        animation: activeSection === 'home' ? 'pulse 1.5s infinite' : 'none',
                        boxSizing: 'border-box',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.background = 'linear-gradient(to right, #C19A6B, #D2B48C)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.background = activeSection === 'home' ? 'linear-gradient(to right, #D2B48C, #C19A6B)' : '#F5E5C1';
                      }}
                      onClick={() => setIsSidebarOpen(false)}
                      aria-label={item.name}
                      role="menuitem"
                    >
                      <span style={{ display: 'inline-block', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                        {item.icon}
                      </span>
                      {item.name}
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setActiveSection(item.name);
                      setIsSidebarOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      minHeight: '45px',
                      background: activeSection === item.name ? 'linear-gradient(to right, #D2B48C, #C19A6B)' : '#F5E5C1',
                      color: activeSection === item.name ? '#FFF5E1' : '#3A2B1F',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '15px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontFamily: language === 'ar' ? "'Amiri', serif" : "'Roboto', sans-serif",
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: activeSection === item.name ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 6px rgba(0,0,0,0.1)',
                      animation: activeSection === item.name ? 'pulse 1.5s infinite' : 'none',
                      boxSizing: 'border-box',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.background = 'linear-gradient(to right, #C19A6B, #D2B48C)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.background = activeSection === item.name ? 'linear-gradient(to right, #D2B48C, #C19A6B)' : '#F5E5C1';
                    }}
                    aria-label={item.name}
                    role="menuitem"
                  >
                    <span style={{ display: 'inline-block', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                      {item.icon}
                    </span>
                    {item.name}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main
          style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            backgroundColor: '#F5F5DC',
            position: 'relative',
            transition: 'opacity 0.3s ease',
          }}
        >
          {activeSection ? (
            <div style={{ animation: 'fadeIn 0.5s ease' }}>
              {menuItems.find((item) => item.name === activeSection)?.component}
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: '#3A2B1F', position: 'relative', height: '100%' }}>
              <Image 
                src="/welcome-illustration.png" 
                alt={language === 'ar' ? 'رسم توضيحي ترحيبي' : 'Welcome Illustration'} 
                width={300} 
                height={300} 
                style={{ margin: '20px auto', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }} 
              />
              <h2 style={{ fontSize: '28px', margin: '20px 0 10px', fontWeight: 'bold' }}>
                {language === 'ar' ? 'مرحبًا بك في المواد الدراسية' : 'Welcome to Study Materials'}
              </h2>
              <p style={{ fontSize: '18px', color: '#4A3728' }}>
                {language === 'ar' ? 'اختر قسمًا من القائمة على الجانب لبدء التعلم!' : 'Select a section from the sidebar to start learning!'}
              </p>
            </div>
          )}
        </main>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .container {
            flex-direction: column;
          }
          .sidebar {
            width: 100%;
            max-height: none;
            position: static;
            transform: none;
            order: 0;
          }
          .sidebar-toggle {
            display: block;
          }
          main {
            padding: 10px;
          }
          img {
            width: 200px;
            height: 200px;
          }
        }
      `}</style>
    </div>
  );
}