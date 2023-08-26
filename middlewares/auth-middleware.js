const jwt =require('jsonwebtoken')
const UserModel =require('../models/user.js')
const ExpressError = require('../utils/ExpressError');
const {userSchema} = require('../schema.js');


var validateUser = async (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  // res.send("HEllow");
  if (error) {
      const msg = error.details.map(el => el.message).join(',')
      console.log(msg);
      throw new ExpressError(msg, 400)
      
  } else {
      next();
  }
}


var checkUserAuth = async (req, res, next) => {
  let token
  const { authorization } = req.headers
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      // Get Token from header
      token = authorization.split(' ')[1]

      // Verify Token
      const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY)

      // Get User from Token
      req.user = await UserModel.findById(userID).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401).send({ "status": "failed", "message": "Unauthorized User" })
    }
  }
  if (!token) {
    res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" })
  }
}

module.exports= {checkUserAuth, validateUser};