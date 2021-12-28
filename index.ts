import mongoose from 'mongoose';
import Server from "./classes/server";
import userRoutes from "./routes/usuario.routes";
import bodyParser from 'body-parser';

const server = new Server();


//Body parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());


//Routes
server.app.use('/user', userRoutes);

//DB Conection
mongoose.connect('mongodb+srv://admin:admin123@fotosgram-curso.hd1yl.mongodb.net/fotosGram?retryWrites=true&w=majority', (err) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
})


//Levantar express
server.start(() => {
    console.log(`servidor corriendo en puerto ${server.port}`)
});

