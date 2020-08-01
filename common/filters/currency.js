import Dinero from 'dinero.js'
import minorCurrency from '../utils/minorCurrency'

function currency(value){
    value = minorCurrency(value)
    return Dinero({amount: value}).toFormat()    
}

export default Vue => {
    Vue.filter('currency', currency)
}