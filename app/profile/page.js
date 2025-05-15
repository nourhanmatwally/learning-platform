'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { translations } from '../../lib/translations';
import { useLanguage } from '../../lib/LanguageContext';
import { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FiBook, FiCheckCircle, FiCalendar, FiAward, FiEdit } from 'react-icons/fi';
import styled from 'styled-components';

const Header = styled.div`
  height: 200px;
  background: url('/header-bg.png') no-repeat center/cover, #F9F5EB;
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 2px solid #4A704A;
`;

const Card = styled.div`
  background: linear-gradient(to bottom right, #EDE4D3, #F9F5EB);
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: transform 0.3s;
  width: 300px;
  height: 340px;
  overflow: auto;
  &:hover {
    transform: translateY(-5px);
  }
`;

const ScheduleCard = styled.div`
  background: linear-gradient(to bottom right, #EDE4D3, #F9F5EB);
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: transform 0.3s;
  width: 300px;
  height: 400px;
  overflow: auto;
  &:hover {
    transform: translateY(-5px);
  }
`;

const Container = styled.div`
  font-family: 'Montserrat', sans-serif;
  color: #333;
  padding: 20px;
  background: #F9F5EB;
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const CardRow = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

export default function Profile() {
  const { data: session } = useSession();
  const { language } = useLanguage();
  const t = translations[language];
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
  const submittedAssignments = [
    { title: t.arabic, score: 90, comment: isArabic ? 'عمل رائع' : 'Great work', date: '2025-05-02' },
  ];
  const pendingAssignments = [
    { title: t.math, deadline: '2025-05-15' },
  ];
  const recentActivities = [
    { activity: isArabic ? 'تم حضور الحصة' : 'Session attended', date: '2025-05-12' },
    { activity: isArabic ? 'تم تسليم النشاط' : 'Activity submitted', date: '2025-05-11' },
  ];
  const totalProgress = Math.round((courses.reduce((sum, c) => sum + c.progress, 0) / courses.length) || 0);
  const achievements = [
    { name: isArabic ? 'شهادة الرياضيات' : 'Math Certificate', date: '2025-04-20' },
    { name: isArabic ? 'مشروع متميز' : 'Outstanding Project', date: '2025-04-15' },
  ];
  const uploadedFiles = [
    { name: isArabic ? 'ملف العلوم.pdf' : 'Science File.pdf', date: '2025-05-10' },
  ];
  const upcomingEvents = [
    { event: isArabic ? 'حصة العلوم' : 'Science Class', date: '2025-05-14', time: '10:00' },
    { event: isArabic ? 'تسليم مهمة الرياضيات' : 'Math Assignment Deadline', date: '2025-05-15', time: '23:59' },
  ];

  return (
    <>
      <Header>
        <img
          src={session.user.image && session.user.image !== '' ? session.user.image : 'https://via.placeholder.com/100?text=Profile'}
          alt={t.profilePicture}
          style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #4A704A', marginRight: '20px' }}
        />
        <div>
          <h1 style={{ color: '#4A704A', margin: 0, fontWeight: 600 }}>{session.user.name}</h1>
          <p style={{ color: '#4A704A', fontWeight: 400 }}>{gradeLevel}</p>
          <Link href="/profile/edit" style={{ textDecoration: 'none' }}>
            <button
              style={{
                backgroundColor: '#4A704A',
                color: '#fff',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontWeight: 600,
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#3A5A3A')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#4A704A')}
            >
              <FiEdit /> {t.editProfile}
            </button>
          </Link>
        </div>
      </Header>
      <Container>
        <CardRow>
          {/* Overview */}
          <Card>
            <h2 style={{ color: '#4A704A', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2em', fontWeight: 600 }}>
              <FiBook style={{ fontSize: '1.5em' }} /> {isArabic ? 'نظرة عامة' : 'Overview'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9em', fontWeight: 'bold' }}>
              <div style={{ textAlign: 'center', flex: '1' }}>
                <strong>{isArabic ? 'تحصيل المهارات' : 'Skill Acquisition'}</strong>
                <div style={{ textAlign: 'center', width: '80px', height: '80px', margin: '0 auto' }}>
                  <CircularProgressbar
                    value={totalProgress}
                    text={`${totalProgress}%`}
                    styles={buildStyles({ textColor: '#333', pathColor: '#6B8A6B', trailColor: '#EDE4D3', textSize: '20px' })}
                  />
                </div>
              </div>
              <div style={{ textAlign: 'center', flex: '1' }}>
                <strong>{isArabic ? 'آخر الأنشطة' : 'Recent Activities'}</strong>
                <ul style={{ paddingLeft: '10px', textAlign: 'left', margin: '5px 0' }}>
                  {recentActivities.map((act, i) => (
                    <li key={i} style={{ fontSize: '0.85em' }}>{act.activity} ({act.date})</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {/* Schedule */}
          <ScheduleCard>
            <h2 style={{ color: '#4A704A', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2em', fontWeight: 600 }}>
              <FiCalendar style={{ fontSize: '1.5em' }} /> {isArabic ? 'الجدول الزمني' : 'Schedule'}
            </h2>
            <div style={{ fontSize: '0.9em', fontWeight: 'bold' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '5px', backgroundColor: '#D4D8C8', padding: '5px', borderRadius: '5px' }}>
                <tbody>
                  {Array.from({ length: 5 }, (_, weekIndex) => (
                    <tr key={weekIndex}>
                      {Array.from({ length: 7 }, (_, dayIndex) => {
                        const date = new Date();
                        date.setDate(date.getDate() - date.getDay() + dayIndex + (weekIndex * 7));
                        const event = upcomingEvents.find(e => new Date(e.date).toDateString() === date.toDateString());
                        return (
                          <td
                            key={dayIndex}
                            style={{
                              width: '30px',
                              height: '30px',
                              textAlign: 'center',
                              backgroundColor: '#FFF5E1',
                              borderRadius: '50%',
                              padding: '5px',
                            }}
                          >
                            {date.getDate()}
                            {event && (
                              <div style={{ fontSize: '0.7em', color: '#4A704A' }}>
                                {event.event}
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScheduleCard>
        </CardRow>

        <CardRow>
          {/* Achievements */}
          <Card>
            <h2 style={{ color: '#4A704A', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2em', fontWeight: 600 }}>
              <FiAward style={{ fontSize: '1.5em' }} /> {isArabic ? 'الإنجازات' : 'Achievements'}
            </h2>
            <div style={{ fontSize: '0.9em', fontWeight: 'bold', textAlign: 'center' }}>
              <img src="/badge-icon.png" alt="Badge Icon" style={{ width: '40px', marginBottom: '5px' }} />
              <ul style={{ paddingLeft: '0', listStyle: 'none', margin: '5px 0' }}>
                {achievements.map((ach, i) => (
                  <li key={i} style={{ fontSize: '0.85em', margin: '3px 0' }}>
                    {ach.name} ({ach.date})
                  </li>
                ))}
                <li style={{ fontSize: '0.85em', margin: '3px 0' }}>
                  {isArabic ? 'ملفات مرفوعة' : 'Uploaded Files'}: {uploadedFiles.length}
                </li>
              </ul>
            </div>
          </Card>

          {/* Assignments */}
          <Card>
            <h2 style={{ color: '#4A704A', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2em', fontWeight: 600 }}>
              <FiCheckCircle style={{ fontSize: '1.5em' }} /> {isArabic ? 'المهام' : 'Assignments'}
            </h2>
            <div style={{ fontSize: '0.9em', fontWeight: 'bold' }}>
              <h3>{isArabic ? 'المهام المرسلة' : 'Submitted Assignments'}</h3>
              {submittedAssignments.length > 0 ? (
                <ul>
                  {submittedAssignments.map((assign, i) => (
                    <li key={i} style={{ fontSize: '0.85em' }}>
                      {assign.title}: {assign.score}% - {t.commentLabel}: {assign.comment} ({assign.date})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{t.noResults}</p>
              )}
              <h3>{isArabic ? 'المهام غير المرسلة' : 'Pending Assignments'}</h3>
              {pendingAssignments.length > 0 ? (
                <ul>
                  {pendingAssignments.map((assign, i) => (
                    <li key={i} style={{ fontSize: '0.85em' }}>
                      {assign.title} - {t.deadlineLabel}: {assign.deadline}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{t.noResults}</p>
              )}
            </div>
          </Card>
        </CardRow>
      </Container>
    </>
  );
}