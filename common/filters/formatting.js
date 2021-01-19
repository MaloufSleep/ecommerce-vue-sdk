function ucfirst(value){
    if(!value) return ''
    return value.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export default Vue => {
    Vue.filter('ucfirst', ucfirst)
}