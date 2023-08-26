const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const fileUpload=require("express-fileupload");


const app=express();
app.use(express.json());
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

app.use(fileUpload({
    useTempFiles:true,
    limits:{
        fileSize:50*2024*1024
    }
}));



module.exports = {
    cloudinary,
    storage
} 