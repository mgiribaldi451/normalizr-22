
let socket = io.connect(); 
socket.on('messages', function(data) { 
   console.log(data);
  render(data);
});

function render(data){
  const authorSchema = new normalizr.schema.Entity('author');
  const textSchema = new normalizr.schema.Entity('text');
  const messagesCenterSchema = new normalizr.schema.Entity('messagesCenter',{
    authors: [authorSchema],
    messages: [textSchema]
  }, { idAttribute: 'mensajes' });
    const denormalizeData= [normalizr.denormalize(data.result, messagesCenterSchema, data.entities)];
    console.log(denormalizeData)


    const longO = JSON.stringify(denormalizeData).length;
    console.log("longitud Original es de:"+ longO)
    const longNor = JSON.stringify(data).length;
    console.log("longitud normalizado es de:"+ longNor)
    const porcentaje = (longNor * 100) / longO;
    console.log("porcentaje de compresión es de:"+ porcentaje.toFixed(2) + "%")

    document.getElementById('porcentaje').innerHTML = `Centro de Mensaje. (Compresión: ${porcentaje}%`;

    let authorsDesnorm = denormalizeData.author;
    let textDesnorm = denormalizeData.text;

    const authorsMap = authorsDesnorm.map((elem, index) => {
        return (`<div>
        <p style="font-style:italic; color: green;">
            <strong style="font-style: normal; color:blue;">${elem.alias}</strong>
            <span style="font-style: normal; color:brown;">${elem.email}</span>
            <span style="font-style: italic; color: green;"> ${textDesnorm[index]}</span>
           
            <img width="50" src="${elem.avatar}"/>
        </p>
    </div>`)
    }).join("")
    document.getElementById('mensajes').innerHTML = authorsMap; 


}

function addMessage(e) { 
  if(isValidEmail(document.getElementById('email').value)){

  
  let mensaje = { 
    id:"mensajes",
    author:{
        email:document.getElementById('email').value,
        nombre:document.getElementById('name').value,
        apellido:document.getElementById('surname').value,
        edad:document.getElementById('age').value,
        alias:document.getElementById('nick').value,
        avatar:document.getElementById('avatar').value
    },

    text: document.getElementById('message').value     

};
    socket.emit('new-message', mensaje); // new-message es el nombre del evento (recordatorio)

    document.getElementById('message').value = ''
    document.getElementById('enviar').focus()

    return false;
  }
  else{
    return alert("Mail mal ingresado")
  }
}




function isValidEmail(mail) { 
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail);
}