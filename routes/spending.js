const express = require('express')
const router = express.Router()

router.get('/',(req,res) => {
    res.render('index',{bebra: 'task list',arr: ["Saab", "Volvo", "BMW"]})
})

router.get('/add',(req,res) => {
    res.render('add')
})

router.get('/:id',(req,res) => {
    res.send(`get task with id ${req.params.id}`)
})

module.exports = router