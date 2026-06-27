const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minlength:[8,"password must be at least 8 characters long"]
    },
    refreshToken:{
        type:String,
        default:null,
    }
},{
    timestamps:true
});

const User = mongoose.model('User',userSchema);
module.exports = User;