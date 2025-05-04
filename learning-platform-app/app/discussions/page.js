"use client";

import Link from 'next/link';
import { FaBook, FaQuestionCircle, FaComments, FaProjectDiagram, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useSession, signOut } from 'next-auth/react';
import styles from '../../styles/page.module.css';
export default function Discussions() {
  const { data: session } = useSession();

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
        <div className={styles.authLinks}>
          {session ? (
            <button onClick={() => signOut({ callbackUrl: '/logout' })} className={styles.authButton}>
              <FaSignOutAlt /> تسجيل الخروج
            </button>
          ) : (
            <Link href="/login" className={styles.authButton}>
              <FaSignInAlt /> تسجيل الدخول
            </Link>
          )}
        </div>
      </nav>

      {/* المحتوى الرئيسي */}
      <div className={styles.container}>
        <h1 className={styles.title}>لوحة المناقشات</h1>
        <p className={styles.subtitle}>
          شارك أفكارك وناقش مع زملائك في هذا المكان التفاعلي!
        </p>
        <iframe
          src="https://padlet.com/example/discussion-board"
          className={styles.padletIframe}
          title="لوحة المناقشات"
        ></iframe>
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