import type { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import User from '../models/User'

declare global {
    namespace Express {
        interface Request{
            user?: User
        }
    }
}

export const checkAuth = async (req:Request, res:Response, next:NextFunction) => {
        const bearer = req.headers.authorization

        if (!bearer) {
            const error = new Error('No autorizado')
            return res.status(401).json({ error: error.message })
        }
        const [ , token ] = bearer.split(' ')
        if (!token) {
            const error = new Error('No autorizado')
            return res.status(401).json({ error: error.message })
        }

        try {
            const decoded = verify(token, process.env.JWT_SECRET)
            if (typeof decoded === 'object' && decoded.id) {
                req.user = await User.findByPk(decoded.id, {
                    attributes: ['id', 'email', 'name']
                })
            }
            next()
        } catch (error) {
            return res.status(401).json({ error: 'Token no válido' })
        }

    }