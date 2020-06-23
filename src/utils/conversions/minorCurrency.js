
function isInteger(value){
    return Number.isInteger(value) || typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}

function convertFloat(value){
    return Math.trunc(Math.abs(value) * 100)
}

export default function convertToMinorCurrency(value){
    // return 0 if nothing passed
    if(!value) return 0

    // attempt to parse value from string
    if(typeof value === 'string'){
        // attempt float
        let parsedFloat = parseFloat(value)
        if(!isNaN(parsedFloat)){
            return convertFloat(parsedFloat)
        }

        // attempt int
        let parsedInt = parseInt(value)
        if(!isNaN(parsedInt)){
            return parsedInt * 100
        }
    }
    
    // convert float or use int value
    else if(typeof value === 'number'){
        if(!isInteger(value)){
            return convertFloat(value)
        }
        return value * 100;
    }
    
    throw 'convertToMinorCurrency: Invalid type passed. Float or Integer required.'
}