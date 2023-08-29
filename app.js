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
const stripe=require("stripe")("sk_test_51NjfJWSIXALZOCZyOrn49M4TetfMSKJKYpWxTs2eOkFKaeTiDhm4K23zmtzXHgGMMLvUmDJ9MwQIEFO0sszfPhi5002wkSVZJ8")
const testModel=require("./models/demo")
const cloudinary = require('cloudinary').v2;

// const { CloudinaryStorage } = require('multer-storage-cloudinary');
const fileUpload=require("express-fileupload");
const cron=require("node-cron");
const moment=require("moment");
const server = require('http').createServer(app);
const io = require('socket.io')(server);
var c=0;

const getRawBody=require("raw-body")

const bodyparser=require("body-parser")
// Secure Header http
app.use(bodyparser.urlencoded({ extended: false }));

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

io.on('connection', function(socket){
    console.log("a user connected");
    c++;
    io.emit('usercnt',c);
    socket.on('disconnect',function(){
      console.log("a user disconnected");
      c--;
      io.emit('usercnt',c);
    })
})
app.get("/",(req,res)=>{
    res.render("home")
});

// app.get("/", function(req,res){
//     res.sendFile(__dirname+"/index.html");
//   })
app.use('/demo', demoRoutes);


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

// Webhook

app.post('/hooks',express.raw({type: 'application/json'}),async(req,res)=>{
    let signningSecret="whsec_f9ee4187c1ecb6cc6e63f1fd8fc66dbdcd4e2c1e1f6bab634ad542b131c0f915";

    const payload=req.rawBody || req.body;
    const sig=req.headers['stripe-signature']

    let event;

    try{
        event=stripe.webhooks.constructEvent(payload,sig,signningSecret);
    }catch(err){
        console.log(err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
        
    }
    console.log(req.body);
    console.log(event.type)
    console.log(event.data.object)
    console.log(event.data.object.id)
    res.json({success:true})
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
/////////// Job Scheduling    ///////////////////

cron.schedule('* 9 15 * *', ()=>{
    console.log('Message will display at 9 am daily.',moment().format('DD MMM YYYY hh:mm:ss'));
    // send email code
},{
    timezone: 'Asia/Kolkata'
})
app.use(express.json({limit:"20kb"}));
app.use('/demo/user',userRoutes);

  
const port=process.env.PORT || 4000;
server.listen(port,()=>{
    console.log("Listening");
  })
// app.listen(port,()=>{
//     console.log(`Serving on port ${port}`)
// })
