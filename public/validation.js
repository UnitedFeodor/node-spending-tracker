function validateSpendingForm() {
    console.log("validateSpendingForm")
    let addForm = document.forms.addForm
    console.log("addform",addForm)
    let amount = addForm.amount.value
    console.log("amount",amount)
    
    return validateInputUSD(amount)
}

function validateLimitsForm() {
    console.log("validateLimitsForm")
    let addForm = document.forms.limitsForm
    console.log("limitsForm",limitsForm)
    let amount = limitsForm.amount.value
    console.log("amount",amount)
    
    return validateInputUSD(amount)
    
}

function validateInputUSD(amount) {
    if(!isNumeric(amount)) {
        alert("AMOUNT must be a number!")
        return false 
    }

    let arr = amount.split(".")
    let afterDotSymbols = arr[1].length // after dot symbol amount to multiply
    
    if (arr.length !== 1 && afterDotSymbols > 2) {
        alert("2 or less symbols after dot are allowed in AMOUNT!")
        return false
    }
    return true

}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}



function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }