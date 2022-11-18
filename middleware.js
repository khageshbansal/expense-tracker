
const User = require("./models/user");
var jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    
    let token=req.headers.authorization;
    console.log(token);
    
    var decoded = jwt.verify(token, 'SectretKey');
    User.findByPk(decoded.userid)
    .then(user=>{req.user=user;next() })
.catch(err=>console.log(err)); 

};
