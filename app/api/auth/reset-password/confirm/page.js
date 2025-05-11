import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import connectToMongoose from '../../../../../lib/mongoose';
import User from '../../../../models/User';
import { verifyResetToken } from 'next-auth/jwt';

export default function ConfirmReset() {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await connectToMongoose();
      const decoded = await verifyResetToken(token);
      const user = await User.findById(decoded.sub);
      if (!user) throw new Error('مستخدم غير موجود');

      user.password = newPassword; // هنا بنعتمد على hash في UserSchema
      await user.save();

      setMessage('تم تحديث كلمة المرور بنجاح');
      setTimeout(() => router.push('/api/auth/signin'), 2000);
    } catch (error) {
      setMessage('رابط غير صالح أو انتهت صلاحيته');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">تأكيد إعادة التعيين</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">كلمة المرور الجديدة</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          تحديث كلمة المرور
        </button>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </form>
    </div>
  );
}