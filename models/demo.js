const mongoose=require("mongoose");
const demoSchema= new mongoose.Schema({
    name: {
        type: String,
        required : true,
    },
    email:{
        type: String,
        required:true,
    },
    mobile : {
        type: Number,
    }
})
const demoModel =mongoose.model('demoModel',demoSchema);
module.exports=demoModel;
