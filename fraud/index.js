import Signifyd from './providers/signifyd'

export default function(context){
    const region = context.site.repository.getRegion()
    const fraudServices = region?.customer?.fraud_services
    if(!fraudServices || !fraudServices.length) return

    providerFactory(context, fraudServices)
}

function providerFactory(context, fraudServices){
    fraudServices.forEach(fraudService => {
        switch(fraudService?.provider?.key){
            case 'signifyd': {
                Signifyd(context, fraudService)
                break
            }
            default: {
                if(process.env.NODE_ENV !== 'production') console.warn(`Unsupported fraud provider ${fraudService?.provider?.key}`)
                break
            }
        }
    })
}