'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { translations } from '../../../lib/translations';
import { useLanguage } from '../../../lib/LanguageContext';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 200px);
  background: #f9f5eb;
  padding: 20px;
`;

const QuestionCard = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
`;

const OptionButton = styled.button`
  padding: 10px;
  margin: 5px 0;
  width: 100%;
  background-color: ${(props) => (props.selected ? '#d2b48c' : '#f5f5f5')};
  color: ${(props) => (props.selected ? '#fff' : '#4a3728')};
  border: 1px solid #d2b48c;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d2b48c;
    color: #fff;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
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

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export default function Quiz() {
  const { data: session, status } = useSession();
  const { language } = useLanguage();
  const t = translations[language];
  const router = useRouter();
  const { id } = useParams(); // جلب معرف الاختبار من المسار
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({}); // تخزين إجابات الطالب
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // التحقق من حالة تسجيل الدخول
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    } else if (status === 'authenticated' && session?.user?.email === 'nourhanmatwally07@gmail.com') {
      router.push('/quizzes'); // منع المعلم من الوصول إلى صفحة الاختبار
    } else if (status === 'authenticated') {
      fetchQuiz();
    }
  }, [status, session, router, id]);

  // جلب بيانات الاختبار
  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/quizzes?id=${id}`);
      if (!response.data.quiz) {
        throw new Error('Quiz not found');
      }
      setQuiz(response.data.quiz);
      setError(null);
    } catch (err) {
      console.error('Error fetching quiz:', err);
      setError(language === 'ar' ? 'فشل تحميل الاختبار' : 'Failed to load quiz');
    } finally {
      setLoading(false);
    }
  };

  // التعامل مع اختيار الإجابة
  const handleAnswerSelect = (questionIndex, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  // تقديم الاختبار
  const handleSubmit = async () => {
    // التحقق من أن جميع الأسئلة تمت الإجابة عليها
    if (!quiz || Object.keys(answers).length !== quiz.questions.length) {
      setError(language === 'ar' ? 'يرجى الإجابة على جميع الأسئلة' : 'Please answer all questions');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      // حساب الدرجة
      let score = 0;
      quiz.questions.forEach((question, index) => {
        if (answers[index] === question.correctAnswer) {
          score += 1;
        }
      });

      // حفظ النتيجة عبر API
      await axios.post('/api/results', {
        studentId: session.user.id,
        quizId: id,
        quizTitle: quiz.title,
        score,
        totalQuestions: quiz.questions.length,
        submittedAt: new Date(),
      });

      // إعادة التوجيه إلى صفحة المواد مع إشعار
      router.push('/materials?quizCompleted=true');
    } catch (err) {
      console.error('Error submitting quiz:', err);
      setError(language === 'ar' ? 'فشل تقديم الاختبار' : 'Failed to submit quiz');
    } finally {
      setSubmitting(false);
    }
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

  if (!quiz) {
    return (
      <Container>
        <p style={{ color: '#4a3728', fontSize: '18px' }}>
          {language === 'ar' ? 'الاختبار غير موجود' : 'Quiz not found'}
        </p>
      </Container>
    );
  }

  return (
    <Container>
      <h1 style={{ color: '#4a704a', fontSize: '2em', marginBottom: '20px' }}>
        {quiz.title}
      </h1>
      <p style={{ color: '#4a3728', marginBottom: '20px' }}>{quiz.description}</p>

      {quiz.questions.map((question, qIndex) => (
        <QuestionCard key={qIndex}>
          <h3 style={{ color: '#4a3728', marginBottom: '15px' }}>
            {language === 'ar' ? `السؤال ${qIndex + 1}: ` : `Question ${qIndex + 1}: `}
            {question.questionText}
          </h3>
          {question.options.map((option, oIndex) => (
            <OptionButton
              key={oIndex}
              selected={answers[qIndex] === oIndex}
              onClick={() => handleAnswerSelect(qIndex, oIndex)}
            >
              {option}
            </OptionButton>
          ))}
        </QuestionCard>
      ))}

      <SubmitButton onClick={handleSubmit} disabled={submitting}>
        {submitting
          ? language === 'ar'
            ? 'جاري التقديم...'
            : 'Submitting...'
          : language === 'ar'
          ? 'تقديم الاختبار'
          : 'Submit Quiz'}
      </SubmitButton>
    </Container>
  );
}