import {gql} from 'apollo-server-express'
//schema
const typeDefs=gql`
type Query{
    #gives info of all user 
    users:[User] #response to Query as array of user details

    #get info of particular user via input provided by client as ID 
    #here we just want detail of single user therefore we wont use array
    user(id:ID!):User
    messagesByUser(receiverId:Int!):[Message]
}


input UserInput{
    firstName:String!
    lastName:String!
    email:String!
    password:String!
}

input UserSigninInput{
    email:String!
    password:String!
  }

type Token{
    token:String!
}

scalar Date

type Message{
  id:ID!
  text:String!
  receiverId:Int!
  senderId:Int!
  createdAt:Date!
}

type Mutation{
    signupUser(userNew:UserInput!):User
    signinUser(userSignin:UserSigninInput!):Token
    createMessage(receiverId:Int!,text:String!):Message
    
}


type User{
id:ID! #unique value
firstName:String!
lastName:String!
email:String!

}

type Subscription{
    messageAdded:Message
  }
  
  
`
  
  export default typeDefs