const mongoose = require('mongoose');
const { Schema } = mongoose;

const userProgressSchema = new Schema(
    {
        uid: {
            type: String,
            required: true,
            unique: true
        },
        level: {
            type: Number,
            default: 0
        },
        xp: {
            type: Number,
            default: 0
        },
        traits: {
            type: Schema.Types.ObjectId,
            ref: 'Traits',
            required: true
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('UserProgress', userProgressSchema);
