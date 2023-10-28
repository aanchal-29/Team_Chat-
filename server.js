import {ApolloServer,gql} from 'apollo-server' //gql is a template literal tag used for defining your GraphQL schema.
import typeDefs from './typeDefs.js';
import resolvers from './resolver.js';
import jwt from 'jsonwebtoken'


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>{
      const {authorization} =  req.headers
      if(authorization){
       const {userId} =  jwt.verify(authorization,process.env.JWT_SECRET)
       return {userId}
      }
   }
  });
 
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });