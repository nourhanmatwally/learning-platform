'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { translations } from '../../lib/translations';
import { useLanguage } from '../../lib/LanguageContext';
import styled from 'styled-components';
import { jsPDF } from 'jspdf';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 200px);
  background: #f9f5eb;
  padding: 20px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #d2b48c;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #4a704a;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3a573a;
  }
`;

const QuizList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 500px;
`;

const QuizItem = styled.li`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const EditButton = styled.button`
  padding: 5px 10px;
  background-color: #f0ad4e;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #ec971f;
  }
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  background-color: #d9534f;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #c9302c;
  }
`;

const ExportButton = styled.button`
  padding: 5px 10px;
  background-color: #4a704a;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #3a573a;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

export default function Quizzes() {
  const { data: session, status } = useSession();
  const { language } = useLanguage();
  const t = translations[language];
  const router = useRouter();
  const [quizzes, setQuizzes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    } else if (status === 'authenticated') {
      if (!session?.user?.isTeacher) {
        router.push('/materials');
      } else {
        fetchQuizzes();
      }
    }
  }, [status, session, router]);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/quizzes', {
        params: { teacherId: session?.user?.id },
      });
      setQuizzes(response.data.quizzes || []);
    } catch (err) {
      console.error('Error fetching quizzes:', err);
      setError(language === 'ar' ? 'فشل تحميل الاختبارات' : 'Failed to load quizzes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateQuiz = async () => {
    if (!title || !description) {
      setError(language === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('/api/quizzes', {
        title,
        description,
        teacherId: session?.user?.id,
      });
      setQuizzes([...quizzes, response.data.quiz]);
      setTitle('');
      setDescription('');
      setError(null);
    } catch (err) {
      console.error('Error creating quiz:', err);
      setError(language === 'ar' ? 'فشل إنشاء الاختبار' : 'Failed to create quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      await axios.delete('/api/quizzes', { data: { quizId } });
      setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
    } catch (err) {
      console.error('Error deleting quiz:', err);
      setError(language === 'ar' ? 'فشل حذف الاختبار' : 'Failed to delete quiz');
    }
  };

  const handleExportResults = async (quizId, quizTitle) => {
    try {
      const response = await axios.get('/api/results', {
        params: { quizId },
      });
      const results = response.data.results || [];

      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text(`${quizTitle} Results`, 20, 20);
      doc.setFontSize(12);
      let y = 30;

      if (results.length === 0) {
        doc.text(language === 'ar' ? 'لا توجد نتائج لهذا الاختبار' : 'No results for this quiz', 20, y);
      } else {
        results.forEach((result, index) => {
          doc.text(
            `${index + 1}. Student ID: ${result.studentId}, Score: ${result.score}/${result.totalQuestions}`,
            20,
            y
          );
          y += 10;
        });
      }

      doc.save(`${quizTitle}_results.pdf`);
    } catch (err) {
      console.error('Error exporting results:', err);
      setError(language === 'ar' ? 'فشل تصدير النتائج' : 'Failed to export results');
    }
  };

  const handleEditQuiz = (quizId) => {
    router.push(`/quiz/${quizId}/edit`);
  };

  if (status === 'loading') return <div style={{ textAlign: 'center', padding: '50px' }}>{t.loading}</div>;
  if (status === 'unauthenticated' || (status === 'authenticated' && !session?.user?.isTeacher)) return null;

  return (
    <Container>
      <h1 style={{ color: '#4a704a', fontSize: '2em', marginBottom: '20px' }}>
        {language === 'ar' ? 'إدارة الاختبارات' : 'Manage Quizzes'}
      </h1>

      <Form>
        <Input
          type="text"
          placeholder={language === 'ar' ? 'عنوان الاختبار' : 'Quiz Title'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="text"
          placeholder={language === 'ar' ? 'وصف الاختبار' : 'Quiz Description'}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button onClick={handleCreateQuiz} disabled={loading}>
          {language === 'ar' ? 'إنشاء اختبار' : 'Create Quiz'}
        </Button>
        {error && <p style={{ color: '#d9534f', marginTop: '10px' }}>{error}</p>}
      </Form>

      <h2 style={{ color: '#4a3728', marginBottom: '10px' }}>
        {language === 'ar' ? 'قائمة الاختبارات' : 'Quiz List'}
      </h2>
      {loading ? (
        <p>{language === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>
      ) : quizzes.length === 0 ? (
        <p>{language === 'ar' ? 'لا توجد اختبارات بعد' : 'No quizzes yet'}</p>
      ) : (
        <QuizList>
          {quizzes.map((quiz) => (
            <QuizItem key={quiz._id}>
              <div>
                <strong>{quiz.title}</strong>
                <p>{quiz.description}</p>
                <p>
                  {language === 'ar' ? `عدد الأسئلة: ${quiz.questions?.length || 0}` : `Questions: ${quiz.questions?.length || 0}`}
                </p>
              </div>
              <ButtonContainer>
                <EditButton onClick={() => handleEditQuiz(quiz._id)}>
                  {language === 'ar' ? 'إضافة أسئلة' : 'Add Questions'}
                </EditButton>
                <ExportButton onClick={() => handleExportResults(quiz._id, quiz.title)}>
                  {language === 'ar' ? 'تصدير النتائج' : 'Export Results'}
                </ExportButton>
                <DeleteButton onClick={() => handleDeleteQuiz(quiz._id)}>
                  {language === 'ar' ? 'حذف' : 'Delete'}
                </DeleteButton>
              </ButtonContainer>
            </QuizItem>
          ))}
        </QuizList>
      )}
    </Container>
  );
}