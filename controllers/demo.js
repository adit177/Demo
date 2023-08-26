// module.exports.home = async (req, res) => {
//     res.render('/home')
// }
const testModel=require("../models/demo")
module.exports.new = (req, res) => {
    res.render('demo/new');
}
module.exports.testmodels=async (req,res)=>{
    const p=await testModel.find({});
    
    res.render("demo/demomodels",{p})
}