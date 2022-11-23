

const User = require("../models/user");
const Expense = require("../models/expense");


exports.getAllUsers = async(req, res, next) => {

  let users= await User.findAll();
  res.json(users);

};



exports.getuserexpenses = async(req, res, next) => {
    const userID = req.query.id;
    let reqUser= await User.findByPk(userID);
   let userExpenses= await Expense.findAll({where:{userId:reqUser.id}})
   
 res.json(userExpenses);


 
  };
