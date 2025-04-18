import passport from 'passport';
import jwt from 'passport-jwt';
// import { userModel } from '../models/user.model.js';
import { PRIVATE_KEY } from '../utiils/authToken.js';



const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const initializePassport = () => {
    const cookieExtractor = (req) => {
        let token = null
        if (req && req.cookies) {
            token = req.cookies['coderCookieToken']
        }
        return token 
    }

    console.log(PRIVATE_KEY);

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY
    }, async (dataFromToken, done) => {
        console.log('data form token: ', dataFromToken)
        try {
            return done(null, dataFromToken) 
        } catch (error) {
            done(error)
        }
    }))
    
    
    
}

export {
    initializePassport
}