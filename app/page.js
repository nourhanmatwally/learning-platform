"use client";

import Link from 'next/link';
import { FaBook, FaQuestionCircle, FaComments, FaProjectDiagram, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useSession, signOut } from 'next-auth/react';
import styles from './styles/page.module.css';
export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      {/* الشريط العلوي */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="شعار سكيب" className={styles.logoImage} />
         
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
        <h1 className={styles.title}>مرحبًا بكم في سكيب!</h1>
        <p className={styles.subtitle}>
          منصة تعليمية تفاعلية لطلاب المرحلة الإعدادية
        </p>
        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>المواد الدراسية</h3>
              <p className={styles.cardDescription}>
                اكتشف دروسًا ومواد تعليمية ممتعة لتحسين مهاراتك.
              </p>
              <Link href="/materials" className={styles.cardButton}>
                تصفح المواد
              </Link>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>الاختبارات</h3>
              <p className={styles.cardDescription}>
                جرب اختباراتنا لاختبار معرفتك وتطوير مهاراتك.
              </p>
              <Link href="/quizzes" className={styles.cardButton}>
                ابدأ الاختبار
              </Link>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>المناقشات</h3>
              <p className={styles.cardDescription}>
                شارك أفكارك وناقش مع زملائك في لوحة المناقشات.
              </p>
              <Link href="/discussions" className={styles.cardButton}>
                انضم للمناقشة
              </Link>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>المشاريع</h3>
              <p className={styles.cardDescription}>
                اعمل على مشاريع ممتعة لتطبيق ما تعلمته.
              </p>
              <Link href="/projects" className={styles.cardButton}>
                استكشف المشاريع
              </Link>
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