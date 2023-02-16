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
    checkLimit: checkLimit,
    calculateTotalSpendings: calculateTotalSpendings
}