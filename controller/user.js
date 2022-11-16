const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.loginUser = async(req, res, next) => {

  let  name =req.body.name;
   let email=req.body.email;
  let  password=req.body.password;



 let foundUsers= await User.findAll({where:{email:email}});



if(foundUsers.length) {
for(var data of foundUsers){
   let hash=data.password;

   bcrypt.compare(password, hash, async function(err, result) {
      if(result == true) res.json({success:true,message:'User Logged in successfully'});
      else res.json({success:false,message:'Passwords do no match', status: 401});
      
  });
}
  

}
else res.json({success:false,message:'User does not exist. Fill correct credentials', status: 404});






};


exports.signupUser = (req, res, next) => {
  
   bcrypt.hash(req.body.password, 10, async function(err, hash) {
      await User.create(
         {
         name : req.body.name,
         email :req.body.email,
         password :hash
       }
       
       ).then(result=>res.send(result))
       .catch(err=>res.send(err));
  });
 
};
