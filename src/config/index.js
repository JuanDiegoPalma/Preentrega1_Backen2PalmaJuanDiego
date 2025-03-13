import mongoose from "mongoose";

export const configObject = {
    port: process.env.PORT || 8080
}

export const conectDB = () => {
    console.log('Base de datos conectada');
    mongoose.connect('mongodb://localhost:27017/ecommerce')
}
