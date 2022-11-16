

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userController=require('./controller/user')
const app = express();
app.use(cors());
app.use(bodyParser.json());
const sequelize = require('./util/database');

app.post('/user/login',userController.loginUser);

app.post('/user/signup',userController.signupUser);

console.log('sever started')
   


sequelize
// .sync({ force: true })
.sync()
.then(result => {
  app.listen(3000);
})
.catch(err => {
  console.log(err);
});