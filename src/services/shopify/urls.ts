import {env} from "app/config/env";

export const shopifyUrls = {
    products:{
        'all': `${env.SHOPIFY_HOME}/admin/api/2023-10/products.json`
    },
    collections:{
        'all': `${env.SHOPIFY_HOME}/admin/api/2023-10/smart_collections.json`
    }
}