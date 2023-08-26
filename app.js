const express=require("express")
const app=express();
const jwt=require("jsonwebtoken")
const path=require("path");
const ejsMate=require("ejs-mate");
const methodOverride=require("method-override");
const demoRoutes = require('./routes/demo');
const mongoose=require("mongoose");
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/test';
const MongoStore = require('connect-mongo');
const cors=require("cors")
const userRoutes=require('./routes/user');
const dotenv=require("dotenv")
dotenv.config();
app.use(express.json());
const testModel=require("./models/demo")
const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
const fileUpload=require("express-fileupload");


// // const app=express();
// app.use(express.json());
cloudinary.config({
    cloud_name: 'dcph7qs81',
    api_key: '836284348737676',
    api_secret:'gCpUNwQCMZ8LfyWEeGvs6d2_GLA'
});



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
app.use(fileUpload({
    useTempFiles:true,
    limits:{
        fileSize:50*2024*1024
    }
}))


app.use('/demo', demoRoutes);
app.use('/demo/user',userRoutes);

app.post("/upload",async(req,res)=>{
    const file=req.files.image;
    (async function run(){
        const result = await cloudinary.uploader.upload(file.tempFilePath,{
                    public_id:  `${Date.now()}`,
                    resource_type:"auto",
                    folder:"image"
                });
        console.log(result);
        res.json(result);
        })();
    
})

// app.delete("/delete/:id",async(req,res,next)=>{
//     try{
//         const img=await img.findById(req.params.id);
//         const imgId=img.image.public_id;
//         await cloudinary.uploader.destroy(imgId);
//         const x=await img.findByAndDelete(req.params.asset_id);

//         res.status(201).json({
//             success:true,
//             message: "image Deleted"
//         })
//     }    
//     catch(error){
//         console.log(error);
//         next(error);
//     }
// })

app.get("/",(req,res)=>{
    res.render("home")
});

const port=process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`Serving on port ${port}`)
})