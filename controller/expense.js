
// const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
var fs = require('fs');
const uuid = require('uuid');
const Expense = require("../models/expense");
var AWS = require('aws-sdk');



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




exports.downloadExpenses =  async (req, res, next) => {

  try {
      if(!req.user.ispremiumuser)res.json({ success: false, message: 'User is not a premium User'})
      
let s3 = new AWS.S3({
  accessKeyId: process.env.aws_access_key,
  secretAccessKey: process.env.aws_secret_key,
})

const filename = 'expenses' + uuid.v4() + '.txt';
const data =  JSON.stringify(await req.user.getExpenses());

const config = {
  Key: filename,
  Bucket: 'expense-tracker-uploads',
  Body: data,
  ACL:'public-read',
}

s3.upload(config, function (err, data) {
  console.log(err, data)
  res.json({data:data,success:true})
})

} catch(err) {
    console.log(err);
      res.json({ error: err, success: false, message: 'Something went wrong'})
  }



};