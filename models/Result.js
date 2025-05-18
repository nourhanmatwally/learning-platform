import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true, min: 0 },
  totalQuestions: { type: Number, required: true, min: 1 },
  submittedAt: { type: Date, default: Date.now },
});

const Result = mongoose.models.Result || mongoose.model('Result', ResultSchema);
export default Result;