# Vue.js SDK for eCommerce websites


## Installation
To install, require the package in your project via yarn
```
yarn add git+ssh://git@github.com:MaloufSleep/ecommerce-vue-sdk.git
```

## Configuration
To configure the SDK, import the default exported class and the configuration object. Construct the configuration object with the necessary params, then pass the `Ecommerce` object into Vue.

```js
// app.js
import Ecommerce from '@malouf/ecommerce-vue-sdk'
import EcommerceConfig from '@malouf/ecommerce-vue-sdk/core/config'

import region from '../path/to/region.json'

const config = new EcommerceConfig()
config.endpoint = process.env.VUE_APP_API_ENDPOINT
config.intl.region = region
config.intl.lang = 'en'

Vue.use(new Ecommerce(config))
```

### Parameters
Some parameters are required for the plugin to operate correctly.

#### endpoint (String, required)
The API endpoint that will be the base for all API requests.

#### intl (Object, required)
The international object contains the parameters necessary to configure the app for multi-region use.
- **region (Object, required)** - the default region
- **lang (String, required)** - the default language
