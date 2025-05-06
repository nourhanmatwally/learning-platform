'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from '../styles/page.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      console.log('Step 1: Attempting to sign in with credentials...');
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      console.log('Step 2: Sign-in result:', result);
      if (result?.error) {
        setError('خطأ في البريد الإلكتروني أو كلمة المرور');
        console.log('Step 3: Sign-in failed:', result.error);
      } else {
        console.log('Step 3: Sign-in successful, redirecting...');
        router.push('/');
      }
    } catch (err) {
      setError('حدث خطأ، حاول مرة أخرى');
      console.error('Error in login:', err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      console.log('Step 1: Attempting Google Sign-In...');
      await signIn('google', { callbackUrl: '/' });
      console.log('Step 2: Google Sign-In initiated');
    } catch (err) {
      setError('حدث خطأ أثناء تسجيل الدخول بجوجل');
      console.error('Error in Google Sign-In:', err);
    }
  };

  return (
    <div className={styles.container}>
      <h1>تسجيل الدخول</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          تسجيل الدخول
        </button>
      </form>
      <button onClick={handleGoogleSignIn} className={styles.googleButton}>
        تسجيل الدخول بجوجل
      </button>
      <p>
        ليس لديك حساب؟ <a href="/signup">إنشاء حساب</a>
      </p>
    </div>
  );
}