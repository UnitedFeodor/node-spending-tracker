const Dinero = require('dinero.js')

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
    let resultUSD = Dinero({amount: centsInt, currency: 'USD'})
    return resultUSD
   
}

function dineroToFormatWrapperUSD(amount) {
    return amount.toFormat('$0,00')
}

function calculateTotalSpendings(spendingsList) {
    console.log("calculateTotalSpendings")
    let result = Dinero({amount: 0, currency: 'USD'})
    spendingsList.forEach(element => {
        
        result = result.add(element.amount);
        console.log("result foreach el amount: " + element.amount.getAmount())
        console.log("result foreach res amount: " + result.getAmount())
    });
    return result;
}

function checkLimit(currentSpendings , limit) {
    console.log("checkLimit")
    let exceeding = currentSpendings.subtract(limit)
    let exceedingBelowStr;
    if (exceeding.lessThan(Dinero({ amount: 0 }))) {
        exceedingBelowStr = `below by ${exceeding.toFormat('$0,00')}`
    } else if (exceeding.greaterThan(Dinero({ amount: 0 }))) {
        exceedingBelowStr = `exceeding by ${exceeding.toFormat('$0,00')}`
    } else if (exceeding.equalsTo(Dinero({ amount: 0 }))) {
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
        weeklyLimit: dailyLimit.multiply(7),
        monthlyLimit: dailyLimit.multiply(30),
        yearlyLimit: dailyLimit.multiply(365)
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
    dineroToFormatWrapperUSD : dineroToFormatWrapperUSD,
    checkLimit: checkLimit,
    calculateTotalSpendings: calculateTotalSpendings,
    setLimitsFromDaily : setLimitsFromDaily,
    parseUSDFromFormattedString : parseUSDFromFormattedString
}