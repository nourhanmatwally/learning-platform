'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { FaChartBar, FaComments, FaQuestionCircle } from 'react-icons/fa';
import { translations } from '../../../lib/translations';
import { useLanguage } from '../../../lib/LanguageContext';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background: #F9F5EB;
  min-height: calc(100vh - 200px);
  font-family: 'Montserrat', sans-serif;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Card = styled.div`
  background: linear-gradient(to bottom right, #EDE4D3, #F9F5EB);
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  width: 100%;
  max-width: 600px;
`;

export default function TeacherDashboard() {
  const { data: session, status } = useSession();
  const { language } = useLanguage();
  const t = translations[language];
  const isArabic = language === 'ar';
  const router = useRouter();
  const [sessionsData, setSessionsData] = useState({ labels: [], datasets: [] });
  const [discussionsData, setDiscussionsData] = useState({ labels: [], datasets: [] });
  const [quizzesData, setQuizzesData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    } else if (status === 'authenticated' && session?.user?.role !== 'teacher') {
      router.push('/profile');
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (status !== 'authenticated') return;

      try {
        // جلب بيانات الجلسات
        const sessionsResponse = await axios.get('/api/sessions/all');
        const sessions = sessionsResponse.data;
        const sessionLabels = sessions.map(s => new Date(s.loginTime).toLocaleDateString());
        const sessionDurations = sessions.map(s => s.duration || 0);
        setSessionsData({
          labels: sessionLabels,
          datasets: [{
            label: t.sessionDuration,
            data: sessionDurations,
            backgroundColor: '#6B8A6B',
          }],
        });

        // جلب بيانات المناقشات
        const discussionsResponse = await axios.get('/api/discussions');
        const commentsByUser = discussionsResponse.data.reduce((acc, comment) => {
          acc[comment.userName] = (acc[comment.userName] || 0) + 1;
          return acc;
        }, {});
        setDiscussionsData({
          labels: Object.keys(commentsByUser),
          datasets: [{
            label: t.commentsPerUser,
            data: Object.values(commentsByUser),
            backgroundColor: '#D2B48C',
          }],
        });

        // جلب بيانات الاختبارات
        const quizzesResponse = await axios.get('/api/quizzes');
        const quizzesByUser = quizzesResponse.data.reduce((acc, quiz) => {
          acc[quiz.userId] = (acc[quiz.userId] || 0) + 1;
          return acc;
        }, {});
        setQuizzesData({
          labels: Object.keys(quizzesByUser),
          datasets: [{
            label: t.quizzesCompleted,
            data: Object.values(quizzesByUser),
            backgroundColor: '#C19A6B',
          }],
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [status, session]);

  if (status === 'loading') return <div style={{ textAlign: 'center', padding: '50px' }}>{t.loading}</div>;
  if (status === 'unauthenticated' || (status === 'authenticated' && session?.user?.role !== 'teacher')) return null;

  return (
    <Container>
      <h1 style={{ color: '#4A704A', fontSize: '2em', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FaChartBar /> {t.teacherDashboard}
      </h1>
      <Card>
        <h2 style={{ color: '#4A704A', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaChartBar /> {t.sessionSummary}
        </h2>
        {loading ? <p>{t.loading}</p> : <Bar data={sessionsData} />}
      </Card>
      <Card>
        <h2 style={{ color: '#4A704A', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaComments /> {t.discussionSummary}
        </h2>
        {loading ? <p>{t.loading}</p> : <Bar data={discussionsData} />}
      </Card>
      <Card>
        <h2 style={{ color: '#4A704A', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaQuestionCircle /> {t.quizSummary}
        </h2>
        {loading ? <p>{t.loading}</p> : <Bar data={quizzesData} />}
      </Card>
    </Container>
  );
}