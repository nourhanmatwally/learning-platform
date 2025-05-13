'use client';

import { useSession } from 'next-auth/react';
import { translations } from '../../lib/translations';
import { useLanguage } from '../../lib/LanguageContext';
import { useState } from 'react';
import Calendar from 'react-calendar';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FiEdit, FiBell, FiLock, FiShield } from 'react-icons/fi';
import styled from 'styled-components';

const Sidebar = styled.div`
  width: ${props => (props.isArabic ? '200px' : '200px')};
  background: #F5F5DC;
  padding: 20px;
  position: fixed;
  top: 0;
  bottom: 0;
  ${props => (props.isArabic ? 'left: 0;' : 'right: 0;')}
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0 10px 10px 0;
`;

const Card = styled.div`
  background: #F5F5DC;
  padding: 20px;
  border-radius: 10px;
  margin: 10px 0;
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
`;

const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  color: #333;
  padding: ${props => (props.isArabic ? '20px 220px 20px 20px' : '20px 20px 20px 220px')};
  margin-left: ${props => (props.isArabic ? '200px' : '0')};
  margin-right: ${props => (props.isArabic ? '0' : '200px')};
`;

export default function Profile() {
  const { data: session } = useSession();
  const { language } = useLanguage();
  const t = translations[language];
  const [feedback, setFeedback] = useState('');
  const isArabic = language === 'ar';

  if (!session) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>{t.pleaseSignIn}</div>;
  }

  const gradeLevel = isArabic ? 'الصف الثالث الثانوي' : 'Grade 12';
  const courses = [
    { name: t.arabic, progress: 75 },
    { name: t.math, progress: 50 },
    { name: t.science, progress: 30 },
  ];
  const quizzes = [
    { subject: t.arabic, score: 85, date: '2025-05-01', teacherComment: isArabic ? 'ممتاز!' : 'Excellent!' },
    { subject: t.math, score: 70, date: '2025-05-03', teacherComment: isArabic ? 'تحتاج مراجعة' : 'Needs review' },
  ];
  const submittedAssignments = [
    { title: t.arabic, score: 90, comment: isArabic ? 'عمل رائع' : 'Great work', date: '2025-05-02' },
  ];
  const pendingAssignments = [
    { title: t.math, deadline: '2025-05-15' },
  ];
  const recentActivities = [
    { activity: isArabic ? 'حضور حصة الرياضيات' : 'Attended Math Class', date: '2025-05-12' },
    { activity: isArabic ? 'إرسال مهمة العلوم' : 'Submitted Science Assignment', date: '2025-05-11' },
  ];
  const badges = 5;
  const totalProgress = Math.round((courses.reduce((sum, c) => sum + c.progress, 0) / courses.length) || 0);
  const achievements = [
    { name: isArabic ? 'شهادة الرياضيات' : 'Math Certificate', date: '2025-04-20' },
    { name: isArabic ? 'مشروع متميز' : 'Outstanding Project', date: '2025-04-15' },
  ];
  const uploadedFiles = [
    { name: isArabic ? 'ملف العلوم.pdf' : 'Science File.pdf', date: '2025-05-10' },
  ];
  const upcomingEvents = [
    { event: isArabic ? 'حصة العلوم' : 'Science Class', date: '2025-05-13', time: '10:00' },
    { event: isArabic ? 'تسليم مهمة الرياضيات' : 'Math Assignment Deadline', date: '2025-05-15', time: '23:59' },
  ];

  const handleSupportRequest = async () => {
    const notificationData = { type: 'support', feedback, userId: session.user.id || 'Anonymous', timestamp: new Date().toISOString() };
    try {
      await fetch('/api/notify-developer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(notificationData) });
      alert(isArabic ? 'تم إرسال طلب الدعم!' : 'Support request sent!');
      setFeedback('');
    } catch (err) {
      alert(isArabic ? 'فشل في إرسال الطلب' : 'Failed to send request');
    }
  };

  return (
    <>
      <Sidebar isArabic={isArabic}>
        <img
          src={session.user.image || 'https://via.placeholder.com/100?text=Profile'}
          alt={t.profilePicture}
          style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #8A9A5B', marginBottom: '10px' }}
        />
        <h2 style={{ color: '#8A9A5B', margin: '10px 0' }}>{session.user.name}</h2>
        <p style={{ color: '#555' }}>{gradeLevel}</p>
        <button
          style={{
            backgroundColor: '#8A9A5B',
            color: '#fff',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px',
            transition: 'background-color 0.3s',
            display: 'flex', alignItems: 'center', gap: '5px',
          }}
          onClick={() => alert(isArabic ? 'تحويل لصفحة التعديل!' : 'Redirect to edit page!')}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#6D8050')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#8A9A5B')}
        >
          <FiEdit /> {t.editProfile}
        </button>
      </Sidebar>
      <Container isArabic={isArabic}>
        {/* لوحة الإنجاز */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Card>
            <h3 style={{ color: '#8A9A5B' }}>{isArabic ? 'عدد المواد' : 'Courses'}</h3>
            <p>{courses.length}</p>
          </Card>
          <Card>
            <h3 style={{ color: '#8A9A5B' }}>{isArabic ? 'الإنجاز الكلي' : 'Total Progress'}</h3>
            <CircularProgressbar
              value={totalProgress}
              text={`${totalProgress}%`}
              styles={buildStyles({ textColor: '#333', pathColor: '#8A9A5B', trailColor: '#F5F5DC' })}
            />
          </Card>
          <Card>
            <h3 style={{ color: '#8A9A5B' }}>{isArabic ? 'آخر الأنشطة' : 'Recent Activities'}</h3>
            <ul style={{ paddingLeft: '20px' }}>
              {recentActivities.map((act, i) => <li key={i}>{act.activity} ({act.date})</li>)}
            </ul>
          </Card>
        </div>

        {/* المهام والتقييمات */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Card>
            <h3 style={{ color: '#8A9A5B' }}>{isArabic ? 'المهام المرسلة' : 'Submitted Assignments'}</h3>
            {submittedAssignments.length > 0 ? (
              <ul>
                {submittedAssignments.map((assign, i) => (
                  <li key={i}>{assign.title}: {assign.score}% - {t.commentLabel}: {assign.comment} ({assign.date})</li>
                ))}
              </ul>
            ) : <p>{t.noResults}</p>}
          </Card>
          <Card>
            <h3 style={{ color: '#8A9A5B' }}>{isArabic ? 'المهام غير المرسلة' : 'Pending Assignments'}</h3>
            {pendingAssignments.length > 0 ? (
              <ul>
                {pendingAssignments.map((assign, i) => (
                  <li key={i}>{assign.title} - {t.deadlineLabel}: {assign.deadline}</li>
                ))}
              </ul>
            ) : <p>{t.noResults}</p>}
          </Card>
          <Card>
            <h3 style={{ color: '#8A9A5B' }}>{isArabic ? 'الاختبارات' : 'Quizzes'}</h3>
            {quizzes.length > 0 ? (
              <ul>
                {quizzes.map((quiz, i) => (
                  <li key={i}>{quiz.subject}: {quiz.score}% - {t.dateLabel} {quiz.date} - {t.commentLabel}: {quiz.teacherComment}</li>
                ))}
              </ul>
            ) : <p>{t.noResults}</p>}
          </Card>
        </div>

        {/* الجدول الزمني */}
        <Card>
          <h2 style={{ color: '#8A9A5B' }}>{isArabic ? 'الجدول الزمني' : 'Schedule'}</h2>
          <Calendar
            onChange={() => {}}
            value={new Date()}
            tileContent={({ date }) => {
              const event = upcomingEvents.find(e => new Date(e.date).toDateString() === date.toDateString());
              return event ? <div style={{ background: '#8A9A5B', color: '#fff', borderRadius: '50%', width: '6px', height: '6px', margin: 'auto' }}></div> : null;
            }}
          />
        </Card>

        {/* ملف الإنجازات */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Card>
            <h3 style={{ color: '#8A9A5B' }}>{isArabic ? 'الشهادات والشارات' : 'Certificates & Badges'}</h3>
            <ul>
              {achievements.map((ach, i) => <li key={i}>{ach.name} ({ach.date})</li>)}
            </ul>
          </Card>
          <Card>
            <h3 style={{ color: '#8A9A5B' }}>{isArabic ? 'المشاريع المتميزة' : 'Outstanding Projects'}</h3>
            <ul>
              {achievements.map((ach, i) => <li key={i}>{ach.name} ({ach.date})</li>)}
            </ul>
          </Card>
          <Card>
            <h3 style={{ color: '#8A9A5B' }}>{isArabic ? 'الملفات المرفوعة' : 'Uploaded Files'}</h3>
            <ul>
              {uploadedFiles.map((file, i) => <li key={i}>{file.name} ({file.date})</li>)}
            </ul>
          </Card>
        </div>

        {/* الإعدادات الشخصية */}
        <Card>
          <h2 style={{ color: '#8A9A5B' }}>{isArabic ? 'الإعدادات الشخصية' : 'Personal Settings'}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              style={{
                backgroundColor: '#8A9A5B',
                color: '#fff',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                display: 'flex', alignItems: 'center', gap: '5px',
              }}
              onClick={() => alert(isArabic ? 'تحويل لتعديل البيانات!' : 'Redirect to edit data!')}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#6D8050')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#8A9A5B')}
            >
              <FiEdit /> {isArabic ? 'تعديل البيانات' : 'Edit Data'}
            </button>
            <div>
              <label>{isArabic ? 'تخصيص الإشعارات' : 'Customize Notifications'}</label>
              <p style={{ color: '#555' }}>{isArabic ? 'متاح قريبًا' : 'Coming Soon'}</p>
            </div>
            <div>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder={isArabic ? 'اكتب طلب الدعم هنا...' : 'Write support request here...'}
                style={{ width: '100%', height: '80px', marginBottom: '10px', borderRadius: '5px' }}
              />
              <button
                onClick={handleSupportRequest}
                style={{
                  backgroundColor: '#8A9A5B',
                  color: '#fff',
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  display: 'flex', alignItems: 'center', gap: '5px',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#6D8050')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#8A9A5B')}
              >
                <FiBell /> {isArabic ? 'إرسال طلب دعم' : 'Send Support Request'}
              </button>
            </div>
          </div>
        </Card>

        {/* الخصوصية والأمان */}
        <Card>
          <h2 style={{ color: '#8A9A5B' }}>{isArabic ? 'الخصوصية والأمان' : 'Privacy & Security'}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><FiShield /> {isArabic ? 'تحديد من يرى التفاصيل' : 'Control who sees details'}</label>
              <p style={{ color: '#555' }}>{isArabic ? 'متاح قريبًا (تحتاج تكامل مع قاعدة بيانات)' : 'Coming Soon (requires DB integration)'}</p>
            </div>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><FiLock /> {isArabic ? 'التحقق بخطوتين' : 'Two-Factor Authentication'}</label>
              <p style={{ color: '#555' }}>{isArabic ? 'متاح قريبًا (تحتاج تكامل مع next-auth)' : 'Coming Soon (requires next-auth integration)'}</p>
            </div>
          </div>
        </Card>
      </Container>
    </>
  );
}