import {shopifyUrls} from "app/services/shopify/urls";
import {env} from "app/config/env";

export const getProducts = async() =>{

    try{
        const response = await fetch(shopifyUrls.products.all,{
        headers: new Headers({
            'X-Shopify-Access-Token': env.SHOPIFY_TOKEN
        })
    })
        const {products} = await response.json()
        return products;
    }catch (e) {
    console.log(e)
    }
}