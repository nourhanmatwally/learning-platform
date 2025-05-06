"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaBook, FaQuestionCircle, FaComments, FaProjectDiagram } from 'react-icons/fa';
import styles from '../styles/page.module.css';

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      console.log('Sending data:', { name, email, password }); // <--- أضيفي ده
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 400) {
          setError('البريد الإلكتروني مسجل مسبقًا');
        } else {
          setError(data.error || 'حدث خطأ، حاول مرة أخرى');
        }
      } else {
        router.push('/login');
      }
    } catch (err) {
      console.error('Error in signup:', err); // <--- أضيفي ده
      setError('حدث خطأ، حاول مرة أخرى');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="شعار سكيب" className={styles.logoImage} />
          سكيب
        </div>
        <div className={styles.navLinks}>
          <a href="/materials" className={styles.navLink}>
            <FaBook /> المواد
          </a>
          <a href="/quizzes" className={styles.navLink}>
            <FaQuestionCircle /> الاختبارات
          </a>
          <a href="/discussions" className={styles.navLink}>
            <FaComments /> المناقشات
          </a>
          <a href="/projects" className={styles.navLink}>
            <FaProjectDiagram /> المشاريع
          </a>
        </div>
      </nav>
      <div className={styles.container}>
        <h1 className={styles.title}>إنشاء حساب</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="الاسم"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'جاري التحميل...' : 'إنشاء حساب'}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
        <p>
          لديك حساب؟ <a href="/login">تسجيل الدخول</a>
        </p>
      </div>
    </>
  );
}