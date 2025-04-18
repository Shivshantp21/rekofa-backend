import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true , trim: true},
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}
, {timestamps: true});

export default mongoose.models.Admin || mongoose.model('Admin', adminSchema);