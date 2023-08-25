// module.exports.home = async (req, res) => {
//     res.render('/home')
// }
const demoModel=require("../models/demo")
module.exports.new = (req, res) => {
    res.render('demo/new');
}
module.exports.demomodels=async (req,res)=>{
    const p=await demoModel.find({});
    
    res.render("demo/demomodels",{p})
}