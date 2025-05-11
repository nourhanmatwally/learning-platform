import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
    console.log('Attempting sign-in with:', { email, password });

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      console.log('Sign-in result (full):', JSON.stringify(result, null, 2));

      if (result?.error) {
        console.log('Error received from signIn:', result.error);
        setError(result.error);
        console.log('Error state set to:', result.error);
      } else if (result?.ok) {
        console.log('Sign-in successful, redirecting to dashboard');
        router.push('/dashboard');
      } else {
        console.log('Unexpected result, setting fallback error');
        setError('حدث خطأ أثناء تسجيل الدخول، حاول مرة أخرى');
        console.log('Error state set to: حدث خطأ أثناء تسجيل الدخول، حاول مرة أخرى');
      }
    } catch (err) {
      console.error('Error during signIn:', err.message || err);
      setError(err.message || 'حدث خطأ غير متوقع، حاول مرة أخرى');
      console.log('Error state set to:', err.message || 'حدث خطأ غير متوقع، حاول مرة أخرى');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">تسجيل الدخول</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">كلمة المرور</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        {error && (
          <div className="mb-4 text-red-600">
            <p>{error}</p>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          تسجيل الدخول
        </button>
        <button
          onClick={() => {
            console.log('Reset password button clicked');
            router.push('/api/auth/reset-password');
          }}
          className="mt-3 w-full text-blue-600 underline text-center block text-lg font-medium bg-transparent border-none"
          style={{ background: 'none', border: 'none' }}
        >
          تغيير كلمة المرور
        </button>
      </form>
    </div>
  );
}