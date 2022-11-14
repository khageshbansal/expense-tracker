const User = require('../models/user');

exports.getUser = async(req, res, next) => {

 await User.findAll().then(result=>{
    res.json(result);
 })
 .catch(err=>console.log(err));
};


exports.postUser = async(req, res, next) => {
  
 await User.create(
    {
    name : req.body.name,
    email :req.body.email,
    password :req.body.password
  }
  
  ).then(result=>res.send(result))
  .catch(err=>res.send(err));
};
