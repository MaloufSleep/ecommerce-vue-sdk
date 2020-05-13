# Vue.js SDK for eCommerce websites


## Installation
To install, require the package in your project via yarn
```
yarn add https://github.com/MaloufSleep/ecommerce-vue-sdk.git
```

## Configuration
The default export is a Vue plugin that can be used in any Vue project. Simply import the module and add it to the Vue instance.
```
// app.js
import Ecommerce from '@malouf/ecommerce-vue-sdk'

Vue.use(Ecommerce, params)
```

### Parameters
Some parameters are required for the plugin to operate correctly. These will be passed as the second parameter to the `Vue.use()` function.

#### Store (Object, Required)
A Vuex store is required. The plugin will add modules to this store.
- **instance (Vuex Store Object, Required)** - Vuex store instance.
- **persist (Boolean, Required)** - Persistence via local storage (vuex-persistedstate) is provided by the plugin. Setting the `persist` parameter to `true` enables persistence. When using a static site generating framework (Gridsome or Nuxt), make sure this is set to false while the application is being rendered server-side.
```
// app.js
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store()

const params = {
    store: {
        instance: store,
        persist: true // For SSR, use isClient or process.client
    }
}
```

#### API (Object)
The API client will be configured and attached to the included services for making network requests for products, cart actions, and checkout.
- **endpoint (String, Required)** - The base url endpoint for all API calls
- **token (Sting)** - The site's public token
```
// app.js
const params = {
    api: {
        endpoint: process.env.VUE_APP_API_ENDPOINT,
		token: process.env.VUE_APP_API_TOKEN
    }
}
```