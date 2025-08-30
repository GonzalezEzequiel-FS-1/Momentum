const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const userSchema = new Schema({
    uid:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        index:true
    },
    displayName:{
        type:String, 
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },
    ToS:{
        type:Boolean,
    },
    taskTutorial:{
        type:Boolean,
        default:true
    },
    appTutorial:{
        type:Boolean,
        default:true
    },
    
    createdAt:{
        type:Date,
        default:Date.now
    }
})
const User =  mongoose.model('User', userSchema)
module.exports = User;