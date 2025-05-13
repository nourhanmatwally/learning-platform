"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import jwt from 'jsonwebtoken';

export default function ConfirmResetPassword() {
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
      const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
      console.log('Decoded token:', decoded);
    } catch (err) {
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(to right, #F5F5DC, #FFF5E1)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "30px",
          backgroundColor: "#FFF5E1",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          border: "1px solid #8A9A5B",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "24px",
            textAlign: "center",
            color: "#4A3728",
            fontFamily: "'Tajawal', sans-serif",
          }}
        >
          تحديث كلمة المرور
        </h1>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "medium",
                color: "#4A3728",
                marginBottom: "8px",
                fontFamily: "'Tajawal', sans-serif",
              }}
            >
              كلمة المرور الجديدة
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
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
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#6F8050")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#8A9A5B")}
              required
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "medium",
                color: "#4A3728",
                marginBottom: "8px",
                fontFamily: "'Tajawal', sans-serif",
              }}
            >
              تأكيد كلمة المرور
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
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
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#6F8050")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#8A9A5B")}
              required
            />
          </div>
          {message && (
            <div
              style={{
                color: "#8A9A5B",
                textAlign: "center",
                fontSize: "14px",
                fontFamily: "'Tajawal', sans-serif",
              }}
            >
              <p>{message}</p>
            </div>
          )}
          {error && (
            <div
              style={{
                color: "#D9534F",
                textAlign: "center",
                fontSize: "14px",
                fontFamily: "'Tajawal', sans-serif",
              }}
            >
              <p>{error}</p>
            </div>
          )}
          <button
            type="submit"
            style={{
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
            }}
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