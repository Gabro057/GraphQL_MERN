const express = require('express')
const colors = require('colors')
const cors = require('cors');
require('dotenv').config()
const { graphqlHTTP } = require('express-graphql')
const port = process.env.PORT || 5000
const connectDB = require('./config/db')
const schema = require('./schema/schema')

const app = express()

// Connect DB
connectDB()

app.use(cors());
console.log("schema", schema)

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.listen(port, console.log(`Server running on port ${port}. Mode ${process.env.NODE_ENV}`))
