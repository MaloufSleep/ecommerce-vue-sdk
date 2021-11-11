import { exception } from 'vue-gtag'
import isClient from '../../common/utils/isClient'

export default class YotpoService {
    constructor(repository) {
        this.repository = repository
        this.appKey = this.repository.getAppKey()
        if(this.appKey) {
            this.loadScript()
        } else {
            console.warn("Yotpo App Key Not Found")
        }
    }

    /**
     * Loads the Yotpo Script
     */
    loadScript() {
        if (!isClient()) return Promise.resolve(true)

        const src = `//staticw2.yotpo.com/${this.appKey}/widget.js`

        return new Promise((resolve, reject) => {
            const script = document.createElement('script')
            const tag = document.getElementsByTagName('script')[0]

            document.body.appendChild(script)
            script.onload = resolve
            script.onerror = reject
            script.async = true
            script.defer = true
            script.src = src
            script.id = 'yotpo'
            tag.parentNode.insertBefore(script, tag)
        })
    }

    /**
     * Loads the Yotpo order conversion tracking script on the confirmation page after order is complete
     */
    loadOrderScript(order) {
        return new Promise((resolve, reject) => {
            // Order
            const script = document.createElement('script')
            const tag = document.getElementsByTagName('script')[0]

            document.body.appendChild(script)
            script.onload = resolve
            script.onerror = reject
            // script.async = true
            script.defer = true
            script.innerHTML = `yotpoTrackConversionData = {orderId: '${order.order_id}',orderAmount: '${order.total}',orderCurrency: '${order.currency}'}`
            tag.parentNode.insertBefore(script, tag)

            // Img pixel
            const noScript = document.createElement('noscript')
            const tagNS = document.getElementsByTagName('noscript')[0]

            document.body.appendChild(script)
            noScript.onload = resolve
            noScript.onerror = reject
            noScript.innerHTML = `<img src='//api.yotpo.com/conversion_tracking.gif?app_key=${this.appKey}&order_id=${order.order_id}&order_amount=${order.total}&order_currency=${order.currency}' width='1' height='1'>`
            tagNS.parentNode.insertBefore(noScript, tagNS)
        })
    }

    trackEvent(event, eventData){
        return this.repository.trackEvent(event, eventData).then(res => {
            let order = this.$ecommerce.checkout.getOrder();

            console.log('trackEvent Data', res.data);
            console.log('order data', order);
            this.loadOrderScript(order);
        })
    }
}