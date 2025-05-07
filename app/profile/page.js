'use client';

import { useSession } from 'next-auth/react';
import { translations } from '../../lib/translations';
import { useLanguage } from '../../lib/LanguageContext';

export default function Profile() {
  const { data: session } = useSession();
  const { language } = useLanguage();
  const t = translations[language];

  if (!session) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>{t.pleaseSignIn}</div>;
  }

  const courses = [
    { name: t.arabic, progress: 75 },
    { name: t.math, progress: 50 },
    { name: t.science, progress: 30 },
  ];

  const quizzes = [
    { subject: t.arabic, score: 85, date: '2025-05-01' },
    { subject: t.math, score: 70, date: '2025-05-03' },
  ];

  return (
    <div className="container">
      <h1>{t.profile}</h1>
      <div className="card" style={{ marginBottom: '20px' }}>
        <h2>{t.yourInfo}</h2>
        <p><strong>{t.nameLabel}</strong> {session.user.name}</p>
        <p><strong>{t.emailLabel}</strong> {session.user.email}</p>
      </div>
      <div className="card" style={{ marginBottom: '20px' }}>
        <h2>{t.quizResults}</h2>
        {quizzes.length > 0 ? (
          <ul>
            {quizzes.map((quiz, index) => (
              <li key={index}>
                {quiz.subject}: {quiz.score}% - {t.dateLabel} {quiz.date}
              </li>
            ))}
          </ul>
        ) : (
          <p>{t.noResults}</p>
        )}
      </div>
      <div className="card">
        <h2>{t.progress}</h2>
        {courses.map((course, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <p>{course.name}</p>
            <div style={{ backgroundColor: '#F5F5DC', borderRadius: '5px', height: '20px', width: '100%' }}>
              <div
                style={{
                  backgroundColor: '#8A9A5B',
                  width: `${course.progress}%`,
                  height: '100%',
                  borderRadius: '5px',
                }}
              ></div>
            </div>
            <p>{course.progress}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}