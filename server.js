const express = require('express')
const app = express()

const path = require('path')


const multer  = require("multer");
app.use(multer({dest:"uploads"}).single("filedata"));


app.listen(3000)
app.set('view engine', 'ejs')
app.use('/public/', express.static('./public'));
app.use('/uploads', express.static(path.join(__dirname, './uploads/')))



const taskRouter = require('./routes/spending')
app.use('/',taskRouter) 


