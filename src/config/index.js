import mongoose from "mongoose";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
import { program } from '../utiils/process.js'
import { MongoSingleton } from "../utiils/MongoSingleton.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { mode } = program.opts()
console.log(`Modo actual: ${mode}`);

dotenv.config({
    path: mode === 'production'
        ? path.join(__dirname, '../../env.production')
        : path.join(__dirname, '../../.env.developer')
});

const configObject = {
    port: process.env.PORT || 8080,
    privateKey: process.env.PRIVATE_KEY,
    mongo_url: process.env.MONGO_URL || 'mongodb://localhost:27017/ecommerce',
    persistence: process.env.PERSISTENCE
}

const conectDB = () => {
    // console.log('Base de datos conectada');
    // mongoose.connect('mongodb://localhost:27017/ecommerce')
    return MongoSingleton.getInstance('mongodb://localhost:27017/ecommerce')
}

export{
    conectDB,
    configObject
}
