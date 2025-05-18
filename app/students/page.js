'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { translations } from '../../lib/translations';
import { useLanguage } from '../../lib/LanguageContext';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 200px);
  background: #f9f5eb;
  padding: 20px;
`;

const StudentList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
`;

const StudentItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.02);
  }
`;

const DetailButton = styled.button`
  padding: 5px 10px;
  background-color: #4a704a;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3a573a;
  }
`;

export default function Students() {
  const { data: session, status } = useSession();
  const { language } = useLanguage();
  const t = translations[language];
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    } else if (status === 'authenticated' && session?.user?.email !== 'nourhanmatwally07@gmail.com') {
      router.push('/materials');
    } else if (status === 'authenticated') {
      fetchStudents();
    }
  }, [status, session, router]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/users', {
        params: { email: { $ne: 'nourhanmatwally07@gmail.com' } }, // استثناء المعلم الرئيسي
      });
      const studentsData = response.data.users || [];

      // جلب نتائج كل طالب
      const studentsWithStats = await Promise.all(
        studentsData.map(async (student) => {
          const resultsResponse = await axios.get('/api/results', {
            params: { studentId: student.id },
          });
          const results = resultsResponse.data.results || [];
          const completedQuizzes = results.length;
          const totalScore = results.reduce((sum, r) => sum + r.score, 0);
          const totalQuestions = results.reduce((sum, r) => sum + r.totalQuestions, 0);
          const averageScore = totalQuestions > 0 ? (totalScore / totalQuestions) * 100 : 0;

          return {
            ...student,
            completedQuizzes,
            averageScore: Math.round(averageScore),
          };
        })
      );

      setStudents(studentsWithStats);
    } catch (err) {
      console.error('Error fetching students:', err);
      setError(language === 'ar' ? 'فشل تحميل قائمة الطلاب' : 'Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (studentId) => {
    router.push(`/students/${studentId}`);
  };

  if (status === 'loading' || loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>{t.loading}</div>;
  }

  if (error) {
    return (
      <Container>
        <p style={{ color: '#d9534f', fontSize: '18px' }}>{error}</p>
      </Container>
    );
  }

  return (
    <Container>
      <h1 style={{ color: '#4a704a', fontSize: '2em', marginBottom: '20px' }}>
        {language === 'ar' ? 'متابعة الطلاب' : 'Student Progress'}
      </h1>

      {students.length === 0 ? (
        <p>{language === 'ar' ? 'لا يوجد طلاب مسجلين بعد' : 'No students registered yet'}</p>
      ) : (
        <StudentList>
          {students.map((student) => (
            <StudentItem key={student.id} onClick={() => handleViewDetails(student.id)}>
              <span>{student.email}</span>
              <div>
                <span>
                  {language === 'ar'
                    ? `أكمل ${student.completedQuizzes} اختبار`
                    : `Completed ${student.completedQuizzes} quizzes`}
                </span>
                <span style={{ marginLeft: '20px' }}>
                  {language === 'ar'
                    ? `متوسط الدرجات: ${student.averageScore}%`
                    : `Average Score: ${student.averageScore}%`}
                </span>
                <DetailButton>
                  {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                </DetailButton>
              </div>
            </StudentItem>
          ))}
        </StudentList>
      )}
    </Container>
  );
}