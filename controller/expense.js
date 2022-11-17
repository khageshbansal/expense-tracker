

const User = require("../models/expense");

exports.getuser = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => console.log(err));
};

exports.postuser = async (req, res, next) => {
  let data = {
    amount: req.body.amount,
    description: req.body.description,
    category: req.body.category,
  };
  console.log(data);
  await User.create(data)
    .then((result) => {res.json(result)})
    .catch((err) => console.log(err));
};

exports.deleteuser = (req, res, next) => {
  let uid = req.params.id;
  User.destroy({ where: { id: uid } })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
  res.end();
};

exports.getsingleuser = (req, res, next) => {
  let uid = req.params.id;
  User.findByPk(uid)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
};
