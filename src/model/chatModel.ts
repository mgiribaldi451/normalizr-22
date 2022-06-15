import mongoose from "mongoose";

const chatCollection = 'mensajes';

const chatSchema = new mongoose.Schema({
    id: {type:String,required:false,max:10000000},
    "author":{
        "email": {type:String,required:false,max:1000000},
        "nombre":{type:String,required:false,max:1000000},
        "apellido":{type:String,required:false,max:1000000},
        "edad":{type:Number,required:false,max:1000000},
        "alias":{type:String,required:false,max:1000000},
        "avatar":{type:String,required:false,max:1000000},
    },
    "text":{type:String,required:false,max:1000000},
})

const chat = mongoose.model(chatCollection,chatSchema)

export default  chat

// {
//     "author":{
//         "id":'mail',
//         "nombre":'nombre',
//         "apellido":'apellido',
//         "edad":'edad',
//         "alias":'alias',
//         "avatar":'foto'
//     },
//     "text":'texto'
// }