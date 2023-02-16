function calculateTotalSpendings(spendingsList) {
    let result = 0
    spendingsList.forEach(element => {
        result+= element.amount;
    });
}

function checkLimit(currentSpendings,limit) {
    //function body
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

    let resultStr = `Spending limit for today: ${exceedingBelowStr}`
    

    return resultStr
}
function common2(key) {
    //function body
    console.log("common2")
}
module.exports = {
    checkLimit: checkLimit,
    calculateTotalSpendings: calculateTotalSpendings
}