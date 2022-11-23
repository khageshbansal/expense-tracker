

const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const userController=require('./controller/user')
const expenseController=require('./controller/expense')
const razorController=require('./controller/razorpay')
const premiumController=require('./controller/premium')
const midddleware=require('./middleware')
const app = express();
app.use(cors());
app.use(bodyParser.json());
const sequelize = require('./util/database');
const Expense = require("./models/expense");
const User = require("./models/user");
const Order = require("./models/orders");

const dotenv = require('dotenv');

// get config vars
dotenv.config();

app.post('/user/login',userController.loginUser);

app.post('/user/signup',userController.signupUser);

console.log('sever started')
   




app.get("/expense",midddleware.auth, expenseController.getExpense);
app.get("/loggedInUser",midddleware.auth, expenseController.loggedInUser);
app.post("/expense",midddleware.auth, expenseController.postExpense);
app.delete("/expense/:id", expenseController.deleteExpense);
app.get("/expense/:id", expenseController.getsingleExpense);

app.get('/premiummembership', midddleware.auth,razorController.purchasepremium);

app.post('/updatetransactionstatus', midddleware.auth, razorController.updateTransactionStatus)

app.get('/getallusers',premiumController.getAllUsers);
app.get('/getuserexpenses',premiumController.getuserexpenses);


User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);


  


sequelize
// .sync({ force: true })
.sync()
.then(result => {
  app.listen(3000);
})
.catch(err => {
  console.log(err);
});