import express, { Router } from 'express';
import logger from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { conectDB, configObject } from './config/index.js';
import cookieParser from 'cookie-parser';
import { sessionsRouter } from './routes/api/sessions.router.js';
import { viewsRouter } from './routes/views.router.js';
import { pruebasRouter } from './routes/pruebas.router.js';
import handlebars from 'express-handlebars';
import passport from 'passport';
import { initializePassport } from './config/passport.config.js'
import { UserRouter } from './routes/api/user.router.js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app  = express()
// const PORT = configObject.port
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(logger('dev'))
app.use(cookieParser('CoderPalab@S3cret@'))


app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))

app.set('views', __dirname + '/views')

app.set('view engine', 'hbs')

initializePassport()
app.use(passport.initialize())
conectDB()

app.use('/', viewsRouter)
app.use('/pruebas', pruebasRouter)
app.use('/api/sessions', sessionsRouter)
const userRouter = Router();
userRouter.get('/', (req, res) => {
    res.send('Ruta de usuarios funcionando');
});
app.use('/api/users', userRouter);

// app.use('/api/products', productsRouter)
// app.use('/api/carts', ()=>{})
// app.use('/api/users', ()=>{})



app.listen(configObject.port , ()=>{
    console.log(`Server on port ${configObject.port}`)
})