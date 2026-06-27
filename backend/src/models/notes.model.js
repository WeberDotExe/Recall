const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'please provide a title for the note'],
        trim:true,
    },
    description:{
        type:String,
        required:[true,'please provide a description for the note'],
        trim:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
},{
    timestamps:true,
});

const note = mongoose.model('note',notesSchema);

module.exports = note;