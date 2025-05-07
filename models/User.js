import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false }, // الآن اختياري عشان جوجل
  provider: { type: String, default: 'google' }, // نوع المزود (جوجل أو غيره)
  createdAt: { type: Date, default: Date.now } // تاريخ الإنشاء
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;