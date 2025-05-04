"use client";

import Link from 'next/link';
import { FaBook, FaQuestionCircle, FaComments, FaProjectDiagram, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useSession, signOut } from 'next-auth/react';
import styles from '../../styles/page.module.css';
export default function Projects() {
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
        <h1 className={styles.title}>المشاريع الجماعية</h1>
        <p className={styles.subtitle}>
          اعمل مع زملائك على مشاريع ممتعة وشارك إبداعاتك!
        </p>
        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>مشروع الرياضيات</h3>
              <p className={styles.cardDescription}>
                أنشئ عرض تقديمي عن موضوع رياضي.
              </p>
              <a
                href="https://docs.google.com/document/d/example-math"
                target="_blank"
                className={styles.cardButton}
              >
                ابدأ المشروع
              </a>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>مشروع العلوم</h3>
              <p className={styles.cardDescription}>
                قدم تجربة علمية ممتعة.
              </p>
              <a
                href="https://docs.google.com/document/d/example-science"
                target="_blank"
                className={styles.cardButton}
              >
                ابدأ المشروع
              </a>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>مشروع اللغة العربية</h3>
              <p className={styles.cardDescription}>
                اكتب قصة قصيرة أو قصيدة.
              </p>
              <a
                href="https://docs.google.com/document/d/example-arabic"
                target="_blank"
                className={styles.cardButton}
              >
                ابدأ المشروع
              </a>
            </div>
          </div>
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