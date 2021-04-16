const graphql = require('graphql')

const Axios = require('axios')
const { default: axios } = require('axios')

const {
GraphQLObjectType,
GraphQLString,
GraphQLID,
GraphQLList,
GraphQLInt,
GraphQLSchema,
GraphQLNonNull
}=graphql

const CompanyType = new GraphQLObjectType({
    name:'Company',
    fields:()=>({
        id:{type:GraphQLInt},
        name:{type:GraphQLString},
        user:{
          type: new GraphQLList(UserType),
          resolve(parent,args){
              console.log('parent',parent)
            return Axios.get(`http://localhost:3000/companies/${parent.id}/users`)
            .then(response=>{
                console.log('resp data',response.data)
                return response.data})
            .catch(console.log)
          }
        }    
        
    })
})

const UserType = new GraphQLObjectType({
    name:'User',
    fields:()=>({
        name:{type:GraphQLString},
        id:{type:GraphQLInt},
        age:{type:GraphQLInt},
        company:{
            type:CompanyType,
            resolve(parent,args){
                console.log('parent',parent)
               return Axios.get(`http://localhost:3000/companies/${parent.companyId}`)
            //    console.log()
               .then(res=>{
                    console.log(res.data)
                return res.data})
               .catch(console.log)
            }
        } 
        
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        user:{
            type:UserType,
            args:{id:{type:GraphQLInt}},
            resolve(parent,args){ //database ma jane chai yo ho
                console.log('parent of rootQuery',parent)
                console.log('args of rootQuery',args)
                return Axios.get(`http://localhost:3000/users/${args.id}`)
                .then(response=>{
                    console.log('resp data',response.data)
                    return response.data})
                .catch(console.log)
            }
        },
        company:{
            type:CompanyType,
            args:{id:{type:GraphQLInt}},
            resolve(parent,args){
                console.log(args)
                return Axios.get(`http://localhost:3000/companies/${args.id}`)
                .then(response=>{
                    console.log('resp data',response.data)
                    return response.data})
                .catch(console.log) 
            }
        }

    }
}) 

const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:()=>({
        addUser:{
            type :UserType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)},
                companyId:{type:GraphQLInt}
            } ,
            resolve(parent,{name,age}){
                
               return Axios.post(`http://localhost:3000/users/`,{
                   name,
                   age
               }) 
               .then(res=>res.data)
            }
        },
        deleteUser:{
            type:UserType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,{id}){
                return axios.delete(`http://localhost:3000/users/${id}`)
                .then(res=>res.data)
            }
        },
        editUser:{
            type:UserType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
                name:{type:GraphQLString},
                age:{type:GraphQLInt},
                companyId:{type:GraphQLInt}
            },
            resolve(parent,args){
                console.log('args',args)
                return axios({
                    method: 'put',
                    url: `http://localhost:3000/users/${args.id}`,
                    data: {
                     age:`${args.age}`,
                     name:`${args.name}`,
                     companyId:`${args.companyId}`
                    }
                  })
                .then(res=>res.data)
            }
        }
    })
}) 

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation
})