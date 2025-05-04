"use client";

import Link from 'next/link';
import { FaBook, FaQuestionCircle, FaComments, FaProjectDiagram } from 'react-icons/fa';
import { useSession, signOut } from 'next-auth/react';
import styles from '../../styles/page.module.css';
import { useEffect } from 'react';

export default function Logout() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      signOut({ callbackUrl: '/' });
    }
  }, [session]);

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
        <h1 className={styles.title}>تسجيل الخروج</h1>
        <p className={styles.subtitle}>
          تم تسجيل خروجك بنجاح! يمكنك العودة إلى الصفحة الرئيسية.
        </p>
        <Link href="/">
          <button className={styles.button}>الرجوع للصفحة الرئيسية</button>
        </Link>
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