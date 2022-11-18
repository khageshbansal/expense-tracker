

const Expense = require("../models/expense");


exports.loggedInUser = (req, res, next) => {
      res.json(req.user);
};


exports.getExpense = (req, res, next) => {

  // Expense.findAll({where:{userId:req.user.id}})
  req.user.getExpenses()
    .then((Expenses) => {
      res.json(Expenses);
    })
    .catch((err) => console.log(err));
};

exports.postExpense = async (req, res, next) => {
  let data = {
    amount: req.body.amount,
    description: req.body.description,
    category: req.body.category,
    // userId:req.user.id
  };

  //  await Expense.create(data)
  await req.user.createExpense(data)
 
    .then((result) => {res.json(result)})
    .catch((err) => console.log(err));
};

exports.deleteExpense = (req, res, next) => {
  let uid = req.params.id;
  Expense.destroy({ where: { id: uid } })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
  res.end();
};

exports.getsingleExpense = (req, res, next) => {
  let uid = req.params.id;
  Expense.findByPk(uid)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
};
