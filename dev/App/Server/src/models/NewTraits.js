const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const traitsSchema = new Schema({
    uid: {
        type: String,
        required: true,
    },
    focus: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    motivation: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    consistency: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    time_management: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    organization: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    resilience: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    charisma: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    adaptability: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    stress_management: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    focus_endurance: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    wisdom: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    strength: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    creativity: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    globalXP:{
        type:Number,
        min:0,
        default:0,
    },
    globalLevel:{
        type:Number,
        min:0,
        default:0,
    }
});

const Traits = mongoose.model("Traits", traitsSchema);

module.exports = Traits;
