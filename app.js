const express= require('express')
const {graphqlHTTP}=require('express-graphql')
const app =express()
const schema = require('./schema/schema')

const cors = require('cors')


app.use(cors({origin: 'http://localhost:3001'}));
console.log(graphqlHTTP)
app.use('/graphql',graphqlHTTP({
    graphiql:true,
    schema
}))

// app.use(cors())
// app.use((req,res,next)=>{
//     res.setHeader('Access-Control-Allow-Origin','*')
//     res.setHeader(
//       'Access-Control-Allow-Headers',
//       'Origin,X-Requested-With','Content-Type','Accept','Authorization',
//       'Access-Control-Allow-Origin'
//     )
//     res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE')
//     next()
//   })
    
//   app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });
  
app.listen(3300,()=>{
    console.log(`app is connected at port 3300`) 
}) 

//note cors chai jaile pani route vanda agadi nai specify garnu prxa ntra work gardena