import jwt from 'jsonwebtoken'
 
export const PRIVATE_KEY = 'askdfaskfdas.--%$klaskdfj'

export const generateToken = userData => jwt.sign(userData, PRIVATE_KEY, {expiresIn: '24h'})