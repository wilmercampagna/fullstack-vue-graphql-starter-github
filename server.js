// Import libraries
const { ApolloServer, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
// mongoose.set('useCreateIndex', true)

const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

// Import typeDefs and resolvers
const filePath = path.join(__dirname, 'typeDefs.gql')
const typeDefs = fs.readFileSync(filePath, 'utf-8')
const resolvers = require('./resolvers')

// Import enviroment variables and mongoose model
require('dotenv').config({path: 'variables.env'})
const User = require('./models/User')
const Post = require('./models/Post')

// connect to mlab database
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err))

// Verify JWT token passed from client

const getUser = async token => {
  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET)
    } catch (err) {
      throw new AuthenticationError('Your session has ended, please sign in again')
    }
  }
}

// Created apollo/graphql server using typeDefs, resolvers and context object
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers['authorization']
    return {User, Post, currentUser: await getUser(token) }
  }
})

// Antes de iniciar tu servidor configura la conexión a tu base de datos, 
// si usas mongo de forma local, primero inicializa mongo, 
// luego configura el path a tu base de datos en el archivo variables.env

// Iniciando el servidor
server.listen({ port: process.env.PORT || 4000 }).then(({url}) => {
  console.log(`server run on port ${url}`)
})
