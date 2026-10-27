import express from "express";
import DB from "./Config/dbConnect.js";

DB.on('error', console.log.bind(console, 'Erro de conexão'))
DB.once("open", () => {
    console.log('Conexão com o banco feita com sucesso')
})

const app = express();
app.use(express.json());


export default app;