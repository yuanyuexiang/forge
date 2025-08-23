import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({ uri: "https://directus.matrix-net.tech/graphql" }), // 替换为您的 Directus API 地址
  cache: new InMemoryCache(),
});

export default client;