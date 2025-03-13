import { Router } from 'express'
import { userModel } from '../../models/user.model.js'
import { createHash, isValidPassword } from '../../utiils/hash.js'
import { generateToken } from '../../utiils/authToken.js'
import { authToken } from '../../middlewares/auth.middleware.js'

export const sessionsRouter = Router()

sessionsRouter
    .post('/register', async (req, res) => {
        const { first_name, last_name, email, password } = req.body
        console.log(req.body)
        if (!email || !password) return res.status(400).send({ status: 'error', error: 'Email y password son requeridos' })
        const userFound = await userModel.findOne({ email })
        if (userFound) return res.status(401).send({ status: 'error', error: 'El usuraio existe' })

        const newUser = {
            first_name,
            last_name,
            email,
            password: createHash(password)  //
        }
        const result = await userModel.create(newUser)
        res.send({ status: 'success', result })
    })
    .post('/login', async (req, res) => {
        const { email, password } = req.body        
        if (!email || !password) return res.status(400).send({ status: 'error', error: 'Email y password son requeridos' })
        const userFound = await userModel.findOne({ email })
        if (!userFound) return res.status(401).send({ status: 'error', error: 'El usuraio no existe' })
        if (!isValidPassword(password, userFound.password)) return res.status(401).send({ status: 'error', error: 'Credenciales invalidas' })

        const token = generateToken({
            id: userFound._id,
            email: userFound.email,
            role: userFound.role
        })

        res.send({ status: 'success', token })

    })


    .get('/current', authToken, (req, res) => {
        // if (!req.user.isAdmin) return res.send('no es admin')
        // res.send('datos sensibles que solo el admin o user puede ver')
        res.send('informacion sensible')
    })

export default sessionsRouter