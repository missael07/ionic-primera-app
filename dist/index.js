"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = __importDefault(require("./classes/server"));
const usuario_routes_1 = __importDefault(require("./routes/usuario.routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const server = new server_1.default();
//Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//Routes
server.app.use('/user', usuario_routes_1.default);
//DB Conection
mongoose_1.default.connect('mongodb+srv://admin:admin123@fotosgram-curso.hd1yl.mongodb.net/fotosGram?retryWrites=true&w=majority', (err) => {
    if (err)
        throw err;
    console.log('Base de datos ONLINE');
});
//Levantar express
server.start(() => {
    console.log(`servidor corriendo en puerto ${server.port}`);
});
