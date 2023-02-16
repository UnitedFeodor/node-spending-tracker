const express = require('express')
const Dinero = require('dinero.js')
const router = express.Router()

const helper = require('./helper');

const price = Dinero({ amount: 5000, currency: 'USD' })

let list = [
    { amount: Dinero({amount: 10000,currency: 'USD'}), type: "food", comments: "cola pizza burgir" },
    { amount: Dinero({amount: 30000,currency: 'USD'}), type: "gym", comments: "gachi is life"  },
    { amount: Dinero({amount: 300,currency: 'USD'}), type: "coke", comments: "mmm delicious"  }
    ]; 

let dailyLimit = Dinero({amount: 10000,currency: 'USD'});
let limits = helper.setLimitsFromDaily(dailyLimit)

let params = {
    list,
    limits, 
    helper
}

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
     
    res.render('add', params)
})

router.post('/add',(req,res) => {
    console.log("post /add")

    

    const amount = parseInt(req.body.amount);
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