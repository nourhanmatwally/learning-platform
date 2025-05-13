"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log("Attempting sign-in with:", { email, password });

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      console.log("Sign-in result (full):", JSON.stringify(result, null, 2));

      if (result?.error) {
        console.log("Error received from signIn:", result.error);
        setError(result.error || "كلمة المرور أو الإيميل غلط");
      } else if (result?.ok) {
        console.log("Sign-in successful, redirecting to home");
        router.push("/"); // غيّرنا من /dashboard لـ /
      } else {
        console.log("Unexpected result, setting fallback error");
        setError("حدث خطأ أثناء تسجيل الدخول، حاول مرة أخرى");
      }
    } catch (err) {
      console.error("Error during signIn:", err.message || err);
      setError(err.message || "حدث خطأ غير متوقع، حاول مرة أخرى");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      console.log("Attempting Google Sign-In...");
      await signIn("google", { callbackUrl: "/" }); // غيّرنا من /dashboard لـ /
      console.log("Google Sign-In initiated");
    } catch (err) {
      setError("حدث خطأ أثناء تسجيل الدخول بجوجل");
      console.error("Error in Google Sign-In:", err);
    }
  };

  const handleSignUp = () => {
    console.log("Redirecting to sign-up page");
    router.push("/signup");
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
          تسجيل الدخول
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
            تسجيل الدخول
          </button>
          <button
            onClick={handleGoogleSignIn}
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
            تسجيل الدخول بجوجل
          </button>
          <button
            onClick={() => {
              console.log("Forgot password button clicked");
              router.push("/reset-password");
            }}
            className="reset-password-btn"
            style={{
              width: "100%",
              background: "none",
              border: "none",
              color: "#1E90FF",
              fontSize: "14px",
              fontWeight: "medium",
              cursor: "pointer",
              textDecoration: "underline",
              fontFamily: "'Tajawal', sans-serif",
              marginTop: "8px",
              textAlign: "center",
            }}
          >
            نسيت كلمة المرور؟
          </button>
          <button
            onClick={handleSignUp}
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
              marginTop: "16px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#6F8050")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#8A9A5B")}
          >
            إنشاء حساب
          </button>
        </form>
      </div>
    </div>
  );
}