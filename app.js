const express=require("express")
const app=express();
const path=require("path");
const ejsMate=require("ejs-mate");
const methodOverride=require("method-override");
const demoRoutes = require('./routes/demo');
const mongoose=require("mongoose");
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/test';
const MongoStore = require('connect-mongo');
const testModel=require("./models/demo")
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

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"))
app.engine("ejs",ejsMate)


app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')))


app.use('/demo', demoRoutes)

app.get("/demomodels",demoRoutes);

app.get("/",(req,res)=>{
    res.render("home")
});

const port=process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`Serving on port ${port}`)
})