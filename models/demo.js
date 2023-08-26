const mongoose=require("mongoose");
const demoSchema= new mongoose.Schema({
    title: {
        type: String,
        required : true,
    },
    body:{
        type: String,
        required:true,
    },
    id : {
        type: Number,
    }
})
const testModel =mongoose.model('testModel',demoSchema);
module.exports=testModel;
