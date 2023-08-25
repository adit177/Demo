const express=require("express")
const app=express();
const path=require("path");
const ejsMate=require("ejs-mate");
const methodOverride=require("method-override");
const demoRoutes = require('./routes/demo');

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"))
app.engine("ejs",ejsMate)

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname, 'public')))


app.use('/demo', demoRoutes)

app.get("/",(req,res)=>{
    res.render("home")
});

const port=process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`Serving on port ${port}`)
})