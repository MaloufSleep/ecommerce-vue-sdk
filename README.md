# Vue.js SDK for eCommerce websites


## Installation
To install, require the package in your project via yarn
```
yarn add git+ssh://git@github.com:MaloufSleep/ecommerce-vue-sdk.git
```

## Configuration
The default export is a Vue plugin that can be used in any Vue project. Simply import the module and add it to the Vue instance.

```js
// app.js
import Ecommerce from '@malouf/ecommerce-vue-sdk'

Vue.use(Ecommerce, params)
```

### Parameters
Some parameters are required for the plugin to operate correctly. These will be passed as the second parameter to the `Vue.use()` function.

#### API (Object, required)
The API client will be configured and attached to the included services for making network requests for products, cart actions, and checkout.
- **endpoint (String, Required)** - The base url for all API calls
- **region (Sting, Required)** - The site region uuid

```env
// .env
VUE_APP_API_ENDPOINT=https://www.mygreatsite.com
VUE_APP_SITE_REGION=75240c8e-a987-476d-9319-ae3f3f8c2f67
```

```js
// app.js
const params = {
    api: {
        endpoint: process.env.VUE_APP_API_ENDPOINT,
        region: process.env.VUE_APP_SITE_REGION
    }
}
```