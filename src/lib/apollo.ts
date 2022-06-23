import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client =  new ApolloClient({
  uri: 'https://api-sa-east-1.graphcms.com/v2/cl4r1kltq0gdw01yw3elc4ohv/master',
  cache: new InMemoryCache()
})