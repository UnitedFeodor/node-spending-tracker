const express = require('express')
const Dinero = require('dinero.js')
const router = express.Router()

const helper = require('./helper');

const price = Dinero({ amount: 5000, currency: 'USD' })

let list = [
    { amount: Dinero({amount: 10000,currency: 'USD'}), type: "food", comments: "cola pizza burgir", date: new Date() },
    { amount: Dinero({amount: 30000,currency: 'USD'}), type: "gym", comments: "gachi is life" , date: new Date() },
    { amount: Dinero({amount: 300,currency: 'USD'}), type: "coke", comments: "mmm delicious" , date: new Date() }
    ]; 

let dailyLimit = Dinero({amount: 100000,currency: 'USD'});
let limits = helper.setLimitsFromDaily(dailyLimit,3,2023)

let params = {
    list,
    limits, 
    helper
}

function addNewSpending(amount,type,comments,date) {
    let entry = {amount,type,comments,date}
    
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
    console.log(req.body.amount + " = req body amount")

    const amount = helper.parseUSDFromFormattedString(req.body.amount)
    console.log(amount.getAmount() + amount.getCurrency())
    const spendingType = req.body.type;
    console.log(spendingType) 
    const comments = req.body.comments;
    console.log(comments)
    const date = new Date()
    console.log("date " + date)
    addNewSpending(amount, spendingType, comments, date)
    res.redirect('/')
})

router.get('/limits',(req,res) => {
    console.log("get /limits")
     
    res.render('limits', params)
})

router.post('/limits',(req,res) => {
    console.log("post /limits")
    const amount = helper.parseUSDFromFormattedString(req.body.amount)
    console.log(amount.getAmount() + amount.getCurrency())
    const limitType = req.body.type;
    console.log(limitType)
    const currDate = new Date()
    const newLimits = helper.chooseLimitFuncByInput(limitType,amount,currDate.getMonth()+1,currDate.getFullYear())
    params.limits = newLimits
    res.redirect('/')
})


router.get('/:id',(req,res) => {
    res.send(`get task with id ${req.params.id}`)
})

module.exports = router