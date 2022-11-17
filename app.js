

const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const userController=require('./controller/user')
const expenseController=require('./controller/expense')
const app = express();
app.use(cors());
app.use(bodyParser.json());
const sequelize = require('./util/database');


app.post('/user/login',userController.loginUser);

app.post('/user/signup',userController.signupUser);

console.log('sever started')
   




app.get("/expense", expenseController.getuser);

app.post("/expense", expenseController.postuser);
app.delete("/expense/:id", expenseController.deleteuser);
app.get("/expense/:id", expenseController.getsingleuser);



sequelize
// .sync({ force: true })
.sync()
.then(result => {
  app.listen(3000);
})
.catch(err => {
  console.log(err);
});