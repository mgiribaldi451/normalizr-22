import { normalize , denormalize , schema } from 'normalizr'

export function desnormalizar(result:any, entities:any) {
    const author = new schema.Entity('author', {}, { idAttribute: 'email' });
    const text = new schema.Entity('text', { author: author },{ idAttribute: 'id' });
    const messagesCenter = new schema.Entity('messagesCenter', {

      authors: author,
      messages: text
    }, { idAttribute: 'id' });
    
    const denormalizeData= denormalize(result, messagesCenter, entities);

    return denormalizeData
}

export function normalizar(obj: any) {
   
    const authorSchema = new schema.Entity('author');
    const textSchema = new schema.Entity('text');
    const messagesCenterSchema = new schema.Entity('messagesCenter', {  
      authors: [authorSchema],
      messages: [textSchema]
    });
    const normalizeData= normalize(obj, messagesCenterSchema);
    console.log(normalizeData);



    return normalizeData
}

//export default {desnormalizar, normalizar};