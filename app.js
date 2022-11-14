

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userController=require('./controller/user')
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
const sequelize = require('./util/database');

app.get('/user',userController.getUser);

app.post('/user',userController.postUser);

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