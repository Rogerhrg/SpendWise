import type { Request, Response } from "express"
import User from "../models/User"
import { hashPassword, verifyPassword } from "../utils/auth"
import { generateToken } from "../utils/token"
import { AuthEmail } from "../emails/AuthEmail"
import { generateJWT } from "../utils/jwt"


export class AuthController {
    static createAccount = async (req:Request, res:Response) => {
        const { email, password } = req.body;
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            const error = new Error("Un usuario con este email ya está registrado");
            return res.status(409).json({ error: error.message });
        }
        try {
            const user = new User(req.body)
            user.password = await hashPassword(password)
            user.token = generateToken()
            await user.save()
            await AuthEmail.sendConfirmationEmail({
                name: user.name,
                email: user.email,
                token: user.token
            })
            res.status(201).json('Usuario Creado correctamente')
        } catch (error) {
            res.status(500).json({error:'Hubo un error'})
        }
    }
    static confirmAccount = async (req:Request, res:Response) => {
        const { token } = req.body
        const user = await User.findOne({ where: { token } })
        if (!user) {
            const error = new Error("Token no válido")
            return res.status(401).json({ error: error.message })
        }
        user.confirmed = true
        user.token = ''
        await user.save()
        return res.json('Cuenta confirmada correctamente')
    }

    static login = async (req:Request, res:Response) => {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } }) 
        if (!user) {
            const error = new Error("El usuario no existe")
            return res.status(404).json({ error: error.message })
        }
        if (!user.confirmed) {
            const error = new Error("Tu cuenta no ha sido confirmada")
            return res.status(403).json({ error: error.message })
        }
        const passwordCorrect = await verifyPassword(password, user.password)
        if (!passwordCorrect) {
            const error = new Error("El password es incorrecto")
            return res.status(401).json({ error: error.message })
        }
        const jwt = generateJWT(user.id)
        res.json({token: jwt})
    }

    static forgotPassword = async (req:Request, res:Response) => {
        const { email } = req.body
        const user = await User.findOne({ where: { email } })
        if (!user) {
            const error = new Error("El usuario no existe")
            return res.status(404).json({ error: error.message })
        }
        const token = generateToken()
        user.token = token
        await user.save()
        await AuthEmail.sendForgotPasswordEmail({
            name: user.name,
            email: user.email,
            token: user.token
        })
        res.json('Hemos enviado un email con las instrucciones')
    }

    static validateToken = async (req:Request, res:Response) => {
        const { token } = req.body
        const user = await User.findOne({ where: { token } })
        if (!user) {
            const error = new Error("Token no válido")
            return res.status(401).json({ error: error.message })
        }
        res.json('Token válido')
    }

    static resetPasswordWithToken = async (req:Request, res:Response) => {
        const { token } = req.params
        const { password } = req.body
        const user = await User.findOne({ where: { token } })
        if (!user) {
            const error = new Error("Token no válido")
            return res.status(401).json({ error: error.message })
        }
        user.password = await hashPassword(password)
        user.token = ''
        await user.save()
        res.json('Password modificado correctamente')
    }
    static userProfile = async (req:Request, res:Response) => {
        const user = req.user
        res.json(user)
    }

    static changePassword = async (req:Request, res:Response) => {
        const { id } = req.user
        const { current_password, new_password } = req.body
        
        const user = await User.findByPk(id)

        const passwordCorrect = await verifyPassword(current_password, user.password)
        if (!passwordCorrect) {
            const error = new Error("El password actual es incorrecto")
            return res.status(401).json({ error: error.message })
        }

        user.password = await hashPassword(new_password)
        await user.save()
        res.json('Password modificado correctamente')
    }
}