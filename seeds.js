const mongoose=require("mongoose");
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/Demo';
const demoModel=require("./models/demo")
mongoose.set("strictQuery", true);
mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log("connection Open")
}).catch(err=>{
    console.log("Errorrrrr")
    console.log(err)
})
const seedModels=[
    {
        name:"Aditya",
        email:"adityaagnihotri177@gmail.com",
        mobile:765432798 
    },
    {
        name:"Rahul",
        email:"rahul177@gmail.com",
        mobile:765432798 
    },
    {
        name:"satyam",
        email:"satyam@gmail.com",
        mobile:765432798 
    },
    {
        name:"kuldeep",
        email:"kuldeep@gmail.com",
        mobile:765432798 
    },
    {
        name:"deppak",
        email:"deppak@gmail.com",
        mobile:765432798 
    }
]
demoModel.insertMany(seedModels)
.then(p=>{
    console.log(p);
})
.catch(e=>{
    console.log(e);
})