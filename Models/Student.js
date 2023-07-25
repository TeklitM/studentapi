const { MongoGridFSChunkError } = require("mongodb/lib");
const mongoose = require("mongoose");


const StudentSchema = mongoose.Schema({
    id:{type:Number,required:false},
    firstName:{ type:String,required:false },
    lastName:{type:String,required:false},
    dateOfBirth:{type:String,required:false},
    image:{type:String,required:false},
});

const Student = mongoose.model('Student',StudentSchema);

module.exports =  {Student};