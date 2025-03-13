import express from 'express'
import { conectDB, configObject } from './config/index.js'
import { sessionsRouter } from './routes/api/sessions.router.js'

const app  = express()
const PORT = configObject.port
app.use(express.json())
app.use(express.urlencoded({extended: true}))


conectDB()

app.get('/', (req, res)=>{
    res.send('Bienvenidos a la pagina principal')
})
app.use('/api/sessions', sessionsRouter)

app.listen(PORT, ()=>{
    console.log(`Escuchando server en puerto ${PORT}`)    
})