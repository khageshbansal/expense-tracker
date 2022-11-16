const User = require('../models/user');

exports.loginUser = async(req, res, next) => {

  let  name =req.body.name;
   let email=req.body.email;
  let  password=req.body.password;

 await User.findAll().then(foundUsers=>{


foundUsers.map((data)=>{
if(data.email==email) {
if(data.password == password) res.json({success:true,message:'User Logged in successfully'});
else res.json({success:false,message:'Passwords do no match'});
}
else res.json({success:false,message:'User does not exist. Fill correct credentials'});
})




 })
 .catch(err=>console.log(err));
};


exports.signupUser = async(req, res, next) => {
  
   console.log(req.body);
 await User.create(
    {
    name : req.body.name,
    email :req.body.email,
    password :req.body.password
  }
  
  ).then(result=>res.send(result))
  .catch(err=>res.send(err));
};
