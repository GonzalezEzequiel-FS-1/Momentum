const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
      index: true
    },
    Title: {
      type: String,
      required: true,
      trim: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    energyLevel: {
      type: String,  
      required: true
    },
    difficulty: {
      type: String, 
      required: true
    },
    traits: {
      type: [String],
      required: true
    },
    urgency: {
      type: String,
      required: true
    },
    ongoing:{
      type:Boolean,
      default:true
    },
      complete:{
      type:Boolean,
      default:false
    },
      active:{
      type:Boolean,
      default:false
    },
    Description: {
      type: Schema.Types.Mixed,
      default: null,
      validate: {
        validator: v => v === null || (typeof v === 'object' && !Array.isArray(v)),
        message: 'Notes must be a plain JSON object or null'
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', TaskSchema);
