const mongoose=require("mongoose");
const fetch=require("node-fetch");

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/test';
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
async function getPost(){
    const post=fetch("https://jsonplaceholder.typicode.com/posts").then((res)=>{
        res.json().then((res)=>{
            // console.log(res);
            for(let i=0;i<res.length;i++){
                const p = new testModel({
                    id : res[i]["id"],
                    title: res[i]["title"],
                    body: res[i]["body"]
                });
                p.save().then(p=>{
                    console.log(p);
                })
                .catch(e=>{
                    console.log(e);
                })
            }
        })
    })    
}
 getPost();