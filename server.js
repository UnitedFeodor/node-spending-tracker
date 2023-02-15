const express = require('express')
const app = express()

app.listen(3000)
app.set('view engine', 'ejs')
app.use('/public/', express.static('./public'));

const taskRouter = require('./routes/taskmanager')
app.use('/taskmanager',taskRouter)