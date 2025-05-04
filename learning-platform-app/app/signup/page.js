"use client";

import Link from 'next/link';
import { FaBook, FaQuestionCircle, FaComments, FaProjectDiagram } from 'react-icons/fa';
import styles from '../../styles/page.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        router.push('/login');
      } else {
        const data = await res.json();
        setError(data.error || 'خطأ في إنشاء الحساب، حاول مرة أخرى');
      }
    } catch (err) {
      setError('حدث خطأ، حاول مرة أخرى');
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
        <h1 className={styles.title}>إنشاء حساب</h1>
        <p className={styles.subtitle}>
          أنشئ حسابًا جديدًا لتبدأ رحلتك التعليمية مع سكيب!
        </p>
        <div className={styles.loginContainer}>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
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
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.button}>
              إنشاء الحساب
            </button>
          </form>
          <p className={styles.signupLink}>
            لديك حساب؟ <Link href="/login">سجل الدخول</Link>
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