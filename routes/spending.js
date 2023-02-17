const express = require('express')
const Dinero = require('dinero.js')
const router = express.Router()
const multer  = require("multer");
const postModel = require("../model/post");

//router.use(multer({dest:"uploads"}).single("filedata"));


const helper = require('../model/helper'); 


let list = [
    { amount: Dinero({amount: 10000,currency: 'USD'}), type: "food", comments: "cola pizza burgir", date: new Date(), image: null },
    { amount: Dinero({amount: 30000,currency: 'USD'}), type: "gym", comments: "gachi is life" , date: new Date(), image: 'uploads\\maxresdefault.jpg' },
    { amount: Dinero({amount: 300,currency: 'USD'}), type: "coke", comments: "mmm delicious" , date: new Date(), image: null }
    ]; 

let dailyLimit = Dinero({amount: 100000,currency: 'USD'});
let limits = helper.setLimitsFromDaily(dailyLimit,3,2023)

let params = {
    list,
    limits, 
    helper
}

function addNewSpending(amount,type,comments,date,image) {
    let entry = {amount,type,comments,date,image}
    params.list.push(entry)
}




router.get('/', async (req,res) => {
    console.log("get /")
    const dbPosts = await postModel.find({})
    
    dbPosts.forEach(element => {
        addNewSpending(element.amount, element.type, element.comments, element.date, element.image)
    });

    try {
        res.render('index', params)
      } catch (error) {
        response.status(500).send(error);
      }

    
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

    let filedata = req.file;
    console.log("filedata",filedata);
    if (!filedata) {
        filedata = null
    } else {
        console.log(filedata.path);
        filedata =filedata.path
    }
        
    addNewSpending(amount, spendingType, comments, date, filedata)
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