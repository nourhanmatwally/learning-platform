import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false }, // اختياري بسبب تسجيل الدخول عبر Google
  provider: { type: String, default: 'google' }, // نوع المزود (جوجل أو غيره)
  role: { type: String, enum: ['admin', 'teacher', 'student'], default: 'student' }, // دور المستخدم
  createdAt: { type: Date, default: Date.now }, // تاريخ الإنشاء
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;