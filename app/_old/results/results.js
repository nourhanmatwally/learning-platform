/*
"use client";

import { useLanguage } from '../lib/LanguageContext';
import { translations } from '../lib/translations';

export default function Results() {
  const { language } = useLanguage();
  const t = translations[language];
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  // بيانات وهمية للنتايج
  const resultsData = [
    { id: 1, student: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed', subject: language === 'ar' ? 'الدراسات' : 'Studies', grade: 85, date: '2025-05-15' },
    { id: 2, student: language === 'ar' ? 'سارة علي' : 'Sara Ali', subject: language === 'ar' ? 'الرياضيات' : 'Math', grade: 92, date: '2025-05-16' },
    { id: 3, student: language === 'ar' ? 'محمود حسن' : 'Mahmoud Hassan', subject: language === 'ar' ? 'العلوم' : 'Science', grade: 78, date: '2025-05-17' },
  ];

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#F5F5DC',
      minHeight: 'calc(100vh - 150px)',
      direction,
      fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif",
    }}>
      <h1 style={{
        color: '#4A3728',
        fontSize: '28px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '30px',
        textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
      }}>
        {t.results}
      </h1>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'linear-gradient(135deg, #FFF5E1 0%, #F5E5C1 100%)',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
        border: '2px solid #D2B48C',
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          color: '#4A3728',
          fontSize: '16px',
        }}>
          <thead>
            <tr style={{ backgroundColor: '#D2B48C', color: '#FFF5E1' }}>
              <th style={{ padding: '10px', borderBottom: '2px solid #C19A6B' }}>{language === 'ar' ? 'الطالب' : 'Student'}</th>
              <th style={{ padding: '10px', borderBottom: '2px solid #C19A6B' }}>{language === 'ar' ? 'المادة' : 'Subject'}</th>
              <th style={{ padding: '10px', borderBottom: '2px solid #C19A6B' }}>{language === 'ar' ? 'الدرجة' : 'Grade'}</th>
              <th style={{ padding: '10px', borderBottom: '2px solid #C19A6B' }}>{language === 'ar' ? 'التاريخ' : 'Date'}</th>
            </tr>
          </thead>
          <tbody>
            {resultsData.map((result) => (
              <tr key={result.id} style={{ borderBottom: '1px solid #D2B48C' }}>
                <td style={{ padding: '10px', textAlign: 'center' }}>{result.student}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{result.subject}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{result.grade}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{result.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
  */