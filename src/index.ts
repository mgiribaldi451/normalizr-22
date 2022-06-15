import express, { Express } from "express";
import bp from "body-parser"
import path from "path";
import {faker} from '@faker-js/faker';
import prod from './routes/productos'
import axios from 'axios'
import chatDaoMongo from './daos/daoMongo'
faker.locale='es'

const app: Express = express();
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(express.static('public'));
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

let http = require("http").Server(app);
let io = require("socket.io")(http);

app.use('/api/', prod);
app.get('/', (req, res) => {
    axios.get('http://localhost:3000/api/productos-test')
    .then(response =>{        
        let productos = response.data
        console.log(productos);
        res.render('index',{productos}) 
    }).catch(error=> {
        console.log(error);
      })
 
})

const chatDao = new chatDaoMongo()

io.on('connection', function (socket) {
    console.log('Un cliente se ha conectado');
    chatDao.getAll()
    .then(res => {
         socket.emit('messages', res);
    })


    socket.on('new-message', function (data) {
        chatDao.getAll()
        .then(res => { 
            io.sockets.emit('messages', res);
    
        })
        //console.log(data);      
        chatDao.save(data)
    });

});


const server = http.listen(3000, function() {
    console.log("listening on *:3000");
  });