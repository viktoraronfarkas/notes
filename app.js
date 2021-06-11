const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('public'));

const indexRouter = require('./routes/index');
app.use('/', indexRouter)

app.listen(port, () => {
  console.log(`Example app listening at localhost:${port}`);
});