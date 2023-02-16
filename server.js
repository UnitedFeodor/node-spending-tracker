const express = require('express')
const app = express()


app.listen(3000)
app.set('view engine', 'ejs')
app.use('/public/', express.static('./public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const taskRouter = require('./routes/spending')
app.use('/',taskRouter) 