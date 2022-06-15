import mongoose from "mongoose";
import chatModel from '../model/chatModel'
import util from 'util'
import { desnormalizar, normalizar } from '../utils/normalizr'
const MONGO_URI = 'mongodb+srv://chat:chat@cluster0.ky0aqm9.mongodb.net/mensajes?retryWrites=true&w=majority'



class ContainerMongo {
    //model: any;
    constructor(model: any) {
        mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, () => console.log('Connected'))

        this.model = model;
    }

    async getAll() {
        //return await this.model.find()

        let msj = await this.model.find()
        //console.log(msj);
        
        let sendData = normalizar(msj)
        return sendData
    }

    async save(document: any) {
        let msj = chatModel
        let saveData = new msj(document)
        saveData.save()
    }

}

export default ContainerMongo;