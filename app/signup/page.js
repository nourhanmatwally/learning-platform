"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
      console.log('Sending data:', { name, email, password });
      const res = await fetch('/api/auth/register', { // تعديل المسار
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
        router.push('/signin');
      }
    } catch (err) {
      console.error('Error in signup:', err);
      setError('حدث خطأ، حاول مرة أخرى');
    } finally {
      setLoading(false);
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
          إنشاء حساب
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
              الاسم
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              كلمة المرور
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
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: "#8A9A5B",
              color: "#FFF5E1",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s",
              fontFamily: "'Tajawal', sans-serif",
              opacity: loading ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = "#6F8050";
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = "#8A9A5B";
            }}
          >
            {loading ? 'جاري التحميل...' : 'إنشاء حساب'}
          </button>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              color: "#4A3728",
              fontFamily: "'Tajawal', sans-serif",
              marginTop: "16px",
            }}
          >
            لديك حساب؟{' '}
            <a
              href="/signin"
              style={{
                color: "#1E90FF",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              تسجيل الدخول
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}