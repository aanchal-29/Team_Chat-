import {ApolloServer,gql} from 'apollo-server' //gql is a template literal tag used for defining your GraphQL schema.
import crypto  from 'crypto'
// console.log(crypto.randomUUID())
const users =[
{
id:"sdasdad",
firstName:"Aanchal",
lastName:"Gupta",
email:"b200047@nitsikkim.ac.in",
password:"12345"
},
{
id:"sadsda2947",
firstName:"Aachu",
lastName:"Gupta",
email:"aanchaljrt29@gmail.com",
password:"123456"
}
];

const Todos = [
    {
    title: "buy book", by: "sdasdad"
    },
    {
    title: "write code", by: "sdasdad"
    },
    {
    title: "record video",
    by: "sadsda2947"
    },
]

//schema
const typeDefs=gql`
type Query{
    # greet:String

    #gives info of all user 
    users:[User] #response to Query as array of user details

    #get info of particular user via input provided by client as ID 
    #here we just want detail of single user therefore we wont use array
    user(id:ID!):User

}


input UserInput{
    firstName:String!
    lastName:String!
    email:String!
    password:String!
}

type Mutation{
    createUser(userNew:UserInput!):User
}


type User{
id:ID! #unique value
firstName:String!
lastName:String!
email:String!
todos:[Todo]
}

type Todo{
    title:String!
    by:ID! 
}
`;
const resolvers={
    Query:{
        // greet:()=>"Hello Aanchal" 
        // resolver for all user and particular user
        // parent will be undefined as it is not in root level query
        //context will echage info between user
        users:()=>users,
        user:(parent,{id},context)=>{// can write 'args' instead of '{id}'
            // console.log(args.id) //now got the id send by client for query
            return users.find(item=>item.id == id)//can replace id with args.id
        }

        
    },
    User:{
todos:(parent)=>{
    // console.log(parent)
    return Todos.filter((todo) => todo.by == parent.id)
}
    },
    Mutation:{ 
        createUser:(_,{userNew})  => {
            const newUser={
                id:crypto.randomUUID(),
                ...userNew
            }
             users.push(newUser)
            return users[users.length - 1];
        }
    }
};
//Creating an Apollo Server: 

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  //
//   const { url } = await startStandaloneServer(server, {
//     listen: { port: 4000 },
//   });
  
//   console.log(`🚀  Server ready at: ${url}`);
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });