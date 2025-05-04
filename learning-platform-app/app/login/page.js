"use client";

import Link from 'next/link';
import { FaBook, FaQuestionCircle, FaComments, FaProjectDiagram, FaGoogle } from 'react-icons/fa';
import { useSession, signIn } from 'next-auth/react';
import styles from '../../styles/page.module.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (result?.error) {
      setError('خطأ في البريد الإلكتروني أو كلمة المرور');
    } else {
      router.push('/');
    }
  };

  return (
    <>
      {/* الشريط العلوي */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="شعار سكيب" className={styles.logoImage} />
          سكيب
        </div>
        <div className={styles.navLinks}>
          <Link href="/materials" className={styles.navLink}>
            <FaBook /> المواد
          </Link>
          <Link href="/quizzes" className={styles.navLink}>
            <FaQuestionCircle /> الاختبارات
          </Link>
          <Link href="/discussions" className={styles.navLink}>
            <FaComments /> المناقشات
          </Link>
          <Link href="/projects" className={styles.navLink}>
            <FaProjectDiagram /> المشاريع
          </Link>
        </div>
      </nav>

      {/* المحتوى الرئيسي */}
      <div className={styles.container}>
        <h1 className={styles.title}>تسجيل الدخول</h1>
        <p className={styles.subtitle}>
          سجل الدخول باستخدام حساب Google أو أنشئ حسابًا جديدًا.
        </p>
        <div className={styles.loginContainer}>
          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className={styles.googleButton}
          >
            <FaGoogle /> تسجيل الدخول باستخدام Google
          </button>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
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
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.button}>
              تسجيل الدخول
            </button>
          </form>
          <p className={styles.signupLink}>
            ليس لديك حساب؟ <Link href="/signup">أنشئ حسابًا</Link>
          </p>
        </div>
      </div>

      {/* الشريط السفلي */}
      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <Link href="/guide" className={styles.footerLink}>
            دليل الاستخدام
          </Link>
          <Link href="/support" className={styles.footerLink}>
            الدعم
          </Link>
        </div>
        <div className={styles.footerText}>
          <p>تواصلوا معانا: example@email.com</p>
        </div>
      </footer>
    </>
  );
}