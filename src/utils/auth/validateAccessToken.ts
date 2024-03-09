import {cookies} from 'next/headers'
import {GraphQLClientSingleton} from "app/graphql";
import {customerName} from "app/graphql/queries/customerName";

export const validateAccessToken =  () =>{
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const graphqlClient =  GraphQLClientSingleton.getInstance().getClient();
    const {customer} =  graphqlClient.request(customerName, {
        customerAccessToken: accessToken,
    });
    return customer;
}