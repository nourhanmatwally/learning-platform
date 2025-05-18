"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { verify } from 'jsonwebtoken'; // تغيير الاستيراد

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "linear-gradient(to right, #F5F5DC, #FFF5E1)",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    padding: "30px",
    backgroundColor: "#FFF5E1",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    border: "1px solid #8A9A5B",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "24px",
    textAlign: "center",
    color: "#4A3728",
    fontFamily: "'Tajawal', sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "medium",
    color: "#4A3728",
    marginBottom: "8px",
    fontFamily: "'Tajawal', sans-serif",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #8A9A5B",
    backgroundColor: "#F5F5DC",
    color: "#4A3728",
    fontSize: "16px",
    outline: "none",
    transition: "all 0.3s",
    fontFamily: "'Tajawal', sans-serif",
  },
  message: {
    color: "#8A9A5B",
    textAlign: "center",
    fontSize: "14px",
    fontFamily: "'Tajawal', sans-serif",
  },
  error: {
    color: "#D9534F",
    textAlign: "center",
    fontSize: "14px",
    fontFamily: "'Tajawal', sans-serif",
  },
  button: {
    width: "100%",
    backgroundColor: "#8A9A5B",
    color: "#FFF5E1",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s",
    fontFamily: "'Tajawal', sans-serif",
  },
};

function ResetPasswordContent() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setError('رابط غير صالح');
      return;
    }

    try {
      const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;
      if (!jwtSecret) {
        throw new Error('JWT_SECRET غير معرف');
      }

      const decoded = verify(token, jwtSecret); // استخدام verify مباشرة
      console.log('Decoded token:', decoded);
    } catch (err) {
      console.error('Error verifying token:', err.message);
      setError('الرابط منتهي الصلاحية أو غير صالح');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين');
      return;
    }

    try {
      const res = await fetch('/api/auth/reset-password/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('تم تحديث كلمة المرور بنجاح');
        setTimeout(() => router.push('/signin'), 3000);
      } else {
        setError(data.message || 'حدث خطأ أثناء تحديث كلمة المرور');
      }
    } catch (err) {
      console.error('Error during password reset:', err);
      setError('حدث خطأ غير متوقع، حاول مرة أخرى');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>تحديث كلمة المرور</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label style={styles.label}>كلمة المرور الجديدة</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#6F8050")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#8A9A5B")}
              required
            />
          </div>
          <div>
            <label style={styles.label}>تأكيد كلمة المرور</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#6F8050")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#8A9A5B")}
              required
            />
          </div>
          {message && (
            <div style={styles.message}>
              <p>{message}</p>
            </div>
          )}
          {error && (
            <div style={styles.error}>
              <p>{error}</p>
            </div>
          )}
          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#6F8050")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#8A9A5B")}
          >
            تحديث كلمة المرور
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ConfirmResetPassword() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '50px' }}>جاري التحميل...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}