import isClient from '../../../common/utils/isClient'

export default function(context, fraudService){
    const cartUuid = context.store.state.cart?.cart?.uuid
    if(!cartUuid) return;

    loadScript(cartUuid)
}

function loadScript(sessionId){
    if(!isClient() || window.SIGNIFYD_GLOBAL) return Promise.resolve(true)
    const src = 'https://cdn-scripts.signifyd.com/api/script-tag.js'
    
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        document.body.appendChild(script)
        script.onload = resolve
        script.onerror = reject
        script.async = true
        script.defer = true
        script.id = 'sig-api'
        script.src = src
        script.dataset.orderSessionId = sessionId
    })
}