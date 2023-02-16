const express = require('express')
const router = express.Router()

var helper = require('./helper');

let list = [
    { amount: 100, type: "food", comments: "cola pizza burgir" },
    { amount: 300, type: "gym", comments: "gachi is life"  },
    { amount: 3, type: "coke", comments: "mmm delicious"  }
    ];

let limit = 123;
let params = {bebra: 'bebra',list, limit, helper:helper}

function addNewSpending(amount,type,comments) {
    let entry = {amount,type,comments}
    
    params.list.push(entry)
}
router.get('/',(req,res) => {
    console.log("get /")
    
    res.render('index', params)
})

router.get('/add',(req,res) => {
    console.log("get /add")
     
    res.render('add',params)
})

router.post('/add',(req,res) => {
    console.log("post /add")

    req.body.p
    const amount = req.body.amount;
    console.log(amount)
    const spendingType = req.body.type;
    console.log(spendingType) 
    const comments = req.body.comments;
    console.log(comments)
    addNewSpending(amount, spendingType, comments )
    res.redirect('/')
})

router.get('/:id',(req,res) => {
    res.send(`get task with id ${req.params.id}`)
})

module.exports = router