const { dinero } = require('dinero.js');

/*
    1 = 100    is 10^2
    2.5 = 250  is 10^2
    3.34 = 334 is 10^2
*/
function parseUSDFromFormattedString(moneyStr) { 
    let arr = moneyStr.split(".")
    let moneyAmountStr
    let afterDotSymbols
    if (arr.length === 1) {
        afterDotSymbols = 1
        moneyAmountStr = arr[0] // no . in input
    } else {
        afterDotSymbols = arr[1].length // after dot symbol amount to multiply
        moneyAmountStr = arr.join('')
    }

    let centsInt = parseInt(moneyAmountStr)*100
    let resultUSD = dinero({amount: centsInt, currency: USD})
    return resultUSD

    
    
}

function calculateTotalSpendings(spendingsList) {
    console.log("calculateTotalSpendings")
    let result = 0
    spendingsList.forEach(element => {
        
        result+= element.amount;
        console.log("result foreach: " + result)
    });
    return result;
}

function checkLimit(currentSpendings , limit) {
    console.log("checkLimit")
    let exceeding = currentSpendings - limit
    let exceedingBelowStr;
    if (exceeding < 0) {
        exceedingBelowStr = `below by ${exceeding}`
    } else if (exceeding > 0) {
        exceedingBelowStr = `exceeding by ${exceeding}`
    } else if (exceeding == 0) {
        exceedingBelowStr = `reached`
    }

    let resultStr = `${exceedingBelowStr}`
    

    return resultStr
}

// TODO find a way to fix months  
function setLimitsFromDaily(dailyLimit) { 
    console.log("setDailyLimitAndCalculateOthers")
    return limits = {
        dailyLimit: dailyLimit,
        weeklyLimit: dailyLimit*7,
        monthlyLimit: dailyLimit*30,
        yearlyLimit: dailyLimit*365
    }
}

function setLimitsFromMonthly(monthlyLimit) {
    console.log("setDailyLimitAndCalculateOthers")
    return limits = {
        dailyLimit: Math.floor(monthlyLimit/30),
        weeklyLimit:  Math.floor(monthlyLimit/30*7),
        monthlyLimit: monthlyLimit,
        yearlyLimit: Math.floor(monthlyLimit/30*365),
    }
}




module.exports = {
    params : params,
    checkLimit: checkLimit,
    calculateTotalSpendings: calculateTotalSpendings
}