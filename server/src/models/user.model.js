import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    rollNo: {
        type: String,
        required: true,
    },
    dept: {
        type: String,
        default: '',
    },
    year: {
        type: String,
        required: true,
    },
    events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
        },
    ],
    teams: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
        },
    ],
    isPaid: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

export default User;